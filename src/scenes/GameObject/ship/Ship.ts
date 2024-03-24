import { param } from "jquery";
import IShip from "./IShip";
import { GameLevel } from "../../../GameLevel";

export default class Ship extends Phaser.GameObjects.Sprite implements IShip{

    private _config:genericConfig;
    private _body:Phaser.Physics.Arcade.Body;

    constructor(params:genericConfig){
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.initShip();
    }
    
    initShip(): void {
        this._config.scene.physics.world.enable(this);
        this._config.scene.add.existing(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this._body.setImmovable(true);
        this._body.setCollideWorldBounds(true);
    }

    setVelocityX(speed:number): void {
        this._body.setVelocityX(speed);
    }

    life(gain:boolean):void{
        if(gain){
            GameLevel.level.life++;
            this._config.scene.events.emit('update-lives', [true])
        }
        else{
            GameLevel.level.life--;
            console.log("colpito da un progiettile: " + GameLevel.level.life);
            this._config.scene.events.emit('update-lives', [false]);
            
        }
    }

    isDestroyed(): boolean {
        if(GameLevel.level.life == 0) return true;
        else return false;
    }
}