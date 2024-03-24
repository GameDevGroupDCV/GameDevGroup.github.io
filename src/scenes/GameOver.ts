import 'phaser';
import { GameData } from "../GameData";
import { GameLevel } from '../GameLevel';
export default class GameOver extends Phaser.Scene {
    private score: number; 
    private _background:Phaser.GameObjects.TileSprite;

    constructor() {
        super({ key: 'gameover' });
        this.score = GameLevel.level.score; 
    }


    create() {
        this._background = this.add.tileSprite(0,0,this.game.canvas.width, this.game.canvas.height,"background").setOrigin(0,0);  
        this.add.text(this.game.canvas.width/2, 150, 'Game Over', { fontSize: '64px', color: '#00ff00' }).setOrigin(0.5).setFontFamily("Nosifer");
        this.add.text(this.game.canvas.width/2, 225, 'Punteggio: ' + this.score, { fontSize: '32px', color: '#00ff00' }).setOrigin(0.5).setFontFamily("Nosifer");
        const restartButton = this.add.text(this.game.canvas.width/2, 350, 'Ricomincia', { fontSize: '32px', color: '#fff000' }).setOrigin(0.5);
        const menuButton = this.add.text(this.game.canvas.width/2, 400, 'Torna alla schermata iniziale', { fontSize: '32px', color: '#fff000' }).setOrigin(0.5);
        
        restartButton 
        .setFontFamily("Nosifer")
        .on("pointerdown", () =>{ this.scene.start('gameplay'),
        this.scene.start('hud'),
        this.scene.bringToTop('hud'),
        GameLevel.level.level = 1,
        GameLevel.level.life = 3,
        GameLevel.level.score = 15; })
        .on("pointerover", () =>{ restartButton.setTint(0xff8900); })
        .on("pointerout", () =>{ restartButton.setTint(0xf0ff00); })
        .setInteractive();

        menuButton
        .setFontFamily("Nosifer")
        .on("pointerdown", () =>{ this.scene.start('intro'), 
        GameLevel.level.level = 1,
        GameLevel.level.life = 3,
        GameLevel.level.score = 15; })
        .on("pointerover", () =>{ menuButton.setTint(0xff8900); })
        .on("pointerout", () =>{ menuButton.setTint(0xf0ff00); })
        .setInteractive();

    }
    update(){
        console.log("update game over");
    }

    init(data: { score: number }) {
      this.score = GameLevel.level.score;
    }
}
