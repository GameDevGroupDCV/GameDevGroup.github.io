import IEnemy from "./IEnemy";

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy{
    private _config:genericConfig;
    private _body:Phaser.Physics.Arcade.Body;
    constructor(params:genericBullet){
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.initEnemy();
    }
    initEnemy(): void {
        this._config.scene.add.existing(this);
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this.setScale(1.7);
    }
}



    /*
    initEnemy(): void {
        this.createMultiple({
            key:this._config.key,
            quantity:44,
            setScale:{x:1.7, y:1.7},
            active:true,
            visible:true
        })

        Phaser.Actions.GridAlign(this.getChildren(), {
            width:11, 
            height:4, 
            cellWidth:50,
            cellHeight:60,
            x:160,
            y:50
        })

    }
    */

