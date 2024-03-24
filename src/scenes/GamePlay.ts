import 'phaser';
import { GameData } from '../GameData';
import Bullet from './GameObject/bullet/Bullet';
import Ship from './GameObject/ship/Ship';
import Enemy from './GameObject/enemy/Enemy';
import { GameLevel } from '../GameLevel';

export default class GamePlay extends Phaser.Scene {
    private _enemyGroup:Phaser.GameObjects.Group;
    private _enemy:Enemy;
    private _ship:Ship
    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys; //cursore
    private _spacebar: Phaser.Input.Keyboard.Key; //barra
    private _bullets: Phaser.GameObjects.Group;
    private _bullets_enemy: Phaser.GameObjects.Group;
    private _background:Phaser.GameObjects.TileSprite;
    private _camera:Phaser.Cameras.Scene2D.Camera;

    constructor() {
        super({key:"gameplay"})
    }

    create() {
        this._camera = this.cameras.main;
        this._background = this.add.tileSprite(0,0,this.game.canvas.width, this.game.canvas.height,"background").setOrigin(0,0);    
        this._ship = new Ship({scene:this, x:this.game.canvas.width/2, y:500, key:"player"});
        this._cursors = this.input.keyboard.createCursorKeys();
        this._spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this._enemyGroup = this.add.group({});
        for(let i = 0; i<44; i++){
            this._enemyGroup.add(new Enemy({scene:this, x:10, y:10, key:'enemy'}));
        }

        Phaser.Actions.GridAlign(this._enemyGroup.getChildren(), {
            width:11, 
            height:4, 
            cellWidth:50,
            cellHeight:60,
            x:160,
            y:50
        })

        this.time.addEvent({
            delay: 3000,
            callback: () => { this._enemyGroup.incY(GameLevel.level.velocityEnemy)},
            callbackScope: this,
            repeat: -1, //usare o repeat
        });
        
        
        this.time.addEvent({
            delay:GameLevel.level.timeEnemyBullet,
            callback:() => {this.randomEnemy()},
            callbackScope:this,
            repeat:-1
        })
        

        this._bullets = this.add.group({})

        this._bullets_enemy=this.add.group({});

        this.physics.add.collider(this._bullets, this._enemyGroup, this.onCollisionEnemy,null,this);
        this.physics.add.collider(this._ship, this._bullets_enemy, this.onCollisionPlayer, null, this);
        this.physics.add.collider(this._ship, this._enemyGroup, this.onCollisionDetected, null, this);
    }

    update(){
        this._ship.setVelocityX(0);
        if(this._cursors.left.isDown){
            this._ship.setVelocityX(-200);
        }
        else if(this._cursors.right.isDown){
            console.log("destra");
            this._ship.setVelocityX(200);
        }
        if(Phaser.Input.Keyboard.JustDown(this._spacebar)){
            let bullet:Bullet = new Bullet({scene:this, x:this._ship.x, y:this._ship.y, key:'bullet', speed: GameLevel.level.velocityPlayerBullet, angle: -90});
            this._bullets.add(bullet);
            console.log(GameLevel.level.velocityPlayerBullet);
        }
        this._background.tilePositionY+=5;

        if(this._enemyGroup.countActive() == 0){
            this.nextLevel();
        }
    }

    shake(){
        this._camera.shake(
            1000, //durata
            0.01, //intensità
            true, //force to start
            (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
              if (progress === 1) { console.log("flash completed"); }
            }, //callback
            this //callback context
          )
    }

    onCollisionEnemy(bullet:any, enemy:any){
        GameLevel.level.score += 5;
        this.events.emit('update-score',[GameLevel.level.score]);
        this._enemyGroup.remove(enemy, true, true);
        this._bullets.remove(bullet, true, true);
    }

    onCollisionPlayer(player:any, bullet:any){
        GameLevel.level.score -= 5;
        this.events.emit('update-score',[GameLevel.level.score]);
        this._bullets_enemy.remove(bullet, true, true);
        this.tweens.add({
            targets:this._ship,
            alpha:0,
            repeat:3,
            yoyo:true,
            duration:200,
            onComplete: () =>{
                this._ship.alpha = 1
            }
        })
        this._ship.life(false);
        if(this._ship.isDestroyed()){
            this.scene.stop();
            this.scene.stop('hud');
            this.scene.start('gameover');
        }
        this.time.addEvent({delay: 0, callback: this.shake, callbackScope: this})
    }

    onCollisionDetected(player:any, enemy:any):void{
        GameLevel.level.score -= 5;
        this.events.emit('update-score',[GameLevel.level.score]);
        this._ship.life(false);
        if(this._ship.isDestroyed()){
            this.scene.stop();
            this.scene.start('gameover');
        }
        
        this._enemyGroup.incY(-275);

        this.tweens.add({
            targets:this._ship,
            alpha:0,
            repeat:3,
            yoyo:true,
            duration:500,
            onComplete: () =>{
                this._ship.alpha = 1
            }
        })
        
    }

    randomEnemy():void{
        let children:Phaser.GameObjects.GameObject[] = this._enemyGroup.getChildren();
        let randomEnemy:Phaser.GameObjects.GameObject = children[Phaser.Math.RND.integerInRange(0, children.length - 1)];
        if(randomEnemy){
            let randomEnemyBody:Phaser.Physics.Arcade.Body = <Phaser.Physics.Arcade.Body>randomEnemy.body;
            let randomEnemyImage:Phaser.GameObjects.Image = <Phaser.GameObjects.Image>randomEnemy;
            console.log();
            this._bullets_enemy.add(new Bullet({scene:this, x:randomEnemyBody.x, y:randomEnemyBody.y, key:'bullet', speed:GameLevel.level.velocityEnemyBullet, angle:90}))
            console.log(GameLevel.level.velocityEnemyBullet)
        }
    }

    nextLevel():void{
        GameLevel.level.level++;
        GameLevel.level.velocityEnemy = GameLevel.level.velocityEnemy += 5;
        GameLevel.level.velocityEnemyBullet = GameLevel.level.velocityEnemyBullet += 50;
        GameLevel.level.velocityPlayerBullet = GameLevel.level.velocityPlayerBullet -= 50;
        GameLevel.level.timeEnemyBullet = GameLevel.level.timeEnemyBullet -= 100;
        GameLevel.level.score = GameLevel.level.score += 10;
        GameLevel.level.life = 3;
        this.events.emit('update-level', [GameLevel.level.level]);
        this.scene.restart();
        
    }
    
}

