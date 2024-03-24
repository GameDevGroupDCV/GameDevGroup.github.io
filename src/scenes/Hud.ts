import { GameData } from "../GameData";
import { GameLevel } from "../GameLevel";
import GamePlay from "./GamePlay";
export default class Hud extends Phaser.Scene{

    private _livesImage:Phaser.GameObjects.Image[] = [];
    private _levelText:Phaser.GameObjects.Text;
    private _scoreText: Phaser.GameObjects.Text;
    private _gamePlay: Phaser.Scene;
    private _textStyle:Phaser.Types.GameObjects.Text.TextStyle;
    
    constructor(){
        super({key:"hud"});
    }

    create(){   
        this._textStyle = {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '15px',
            color: '#00ff00', // Colore verde brillante
            align: 'center',
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000', // Ombra nera
                blur: 2,
                stroke: false,
                fill: true
            }
        };

        this._livesImage = [];

        this._gamePlay = <GamePlay>this.scene.get("gameplay");

	    this._gamePlay.events.off("update-lives", this.updateLives, this);
	    this._gamePlay.events.on("update-lives", this.updateLives, this);

        this._gamePlay.events.off("update-score", this.updateScore, this);
	    this._gamePlay.events.on("update-score", this.updateScore, this);

        this._gamePlay.events.off("update-level", this.updateLevel, this);
	    this._gamePlay.events.on("update-level", this.updateLevel, this);

        this._scoreText= this.add.text(5,5,"Score: " + GameLevel.level.score, this._textStyle);
        this._levelText = this.add.text(5,25,"level: " + GameLevel.level.level, this._textStyle);

        for( let i: number = 0; i<3; i++){
            let _image:Phaser.GameObjects.Image = this.add.image(805 + (i *30), 10, 'life');
            _image.setOrigin(0,0);
            _image.setScale(0.1);
            this._livesImage.push(_image);
        }

       
    }
    
    updateLives(parameters: any[]) {
        if(parameters[0] == true){
            return;
        }
        else{
            let _image:Phaser.GameObjects.Image = this._livesImage.shift();
            console.log("rimossa una vita");
            _image.destroy();
        }
        
    }
    updateScore(param:any[]) {
        this._scoreText.setText("score: " + param[0]);
    }

    updateLevel(param:any[]) {
        this._levelText.setText("level: " + param[0]);
        this.scene.restart();
    }   
}
