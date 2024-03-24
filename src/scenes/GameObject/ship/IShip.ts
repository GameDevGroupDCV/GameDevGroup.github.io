interface IShip{
    initShip():void;
    setVelocityX(speed:number):void;
    life(gain:boolean):void;
    isDestroyed():boolean;
}
export default IShip;