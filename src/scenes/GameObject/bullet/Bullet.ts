import IBullet from "./IBullet";

export default class Bullet extends Phaser.GameObjects.Sprite implements IBullet{

    private _config:genericBullet;
    private _body:Phaser.Physics.Arcade.Body;
    constructor(params:genericBullet){
        super(params.scene, params.x, params.y, params.key);
        this._config = params;
        this.initBullet();
    }
    initBullet(): void {
        this._config.scene.add.existing(this);
        this._config.scene.physics.world.enable(this);
        this._body = <Phaser.Physics.Arcade.Body>this.body;
        this.setAngle(this._config.angle);
        this._body.setVelocityY(this._config.speed);
    }
}