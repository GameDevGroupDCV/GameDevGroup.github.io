import { GameData } from "../GameData";
export default class Intro extends Phaser.Scene {
    constructor(){
        super({key:"intro"})
    }
    private _logo: Phaser.GameObjects.Image;
    private _navicella: Phaser.GameObjects.Image;
    private _startText: Phaser.GameObjects.Text;
    private _background: Phaser.GameObjects.TileSprite;
    private _creditsText:Phaser.GameObjects.Text;
    private _creditsContainer:Phaser.GameObjects.Container;

    
    create(){
        this.input.setDefaultCursor('url(assets/cursor/hand.gif), pointer');
        this._background = this.add.tileSprite(0,0,this.game.canvas.width, this.game.canvas.height,"background").setOrigin(0,0)                     
        this._logo = this.add.image(105,110, "logo").setOrigin(0,0).setAlpha(0).setOrigin(0.5);
        this._startText = this.add.text(GameData.globals.gameWidth/2, GameData.globals.gameHeight/2, "click to start")
        .setInteractive()
        .setFontFamily("Nosifer")
        .setFontSize(50)
        .setTint(0x00ff00)
        .setOrigin()
        .on("pointerover", () =>{
            this._startText.setTint(0xff0000);
        })
        .on("pointerout", () => {
            this._startText.setTint(0x00ff00);
            this.input.setDefaultCursor('url(assets/cursor/hand.gif), pointer');
        })
        .on("pointerdown", () => {
            this.scene.stop();
            this.scene.start("gameplay");
            this.scene.start("hud");
            this.scene.bringToTop("hud");
        });

        this._creditsText = this.add.text(GameData.globals.gameWidth/2, GameData.globals.gameHeight/2+100, "Credits")
        .setOrigin(0.5)
        .setFontFamily("Nosifer")
        .setFontSize(30)
        .setTint(0xf0ff00)
        .on("pointerdown", () =>{ this.openCredits(); })
        .on("pointerover", () =>{ this._creditsText.setTint(0xff8900); })
        .on("pointerout", () =>{ this._creditsText.setTint(0xf0ff00); })
        .setInteractive();

        this._creditsContainer = this.add.container(0,0).setDepth(1002).setAlpha(0);

        let _layer: Phaser.GameObjects.Image = this.add.image(0,0, "layer").setOrigin(0, 0).setInteractive().on("pointerdown", () => {this.closeCredits(); });
        
        let _modal: Phaser.GameObjects.Image = this.add.image(900/2 ,600/2 , "modal").setOrigin(0.5).setInteractive();
        let _creditLabel: Phaser.GameObjects.Text = this.add.text(900/2,180, "Credits").setOrigin(0.5,0.5).setTint(0x000000).setFontSize(40).setFontFamily("roboto").setDepth(1003);
        let _creditDescription: Phaser.GameObjects.Text = this.add.text(200, 200, "Space Invaders sviluppato come esercitazione per la Phaser Game Jam 2024. \n\n AUTORI\n\n Classe IV A INF:\n Christian Ostoni \n Lorenzo Blasio\n Vincenzo Luciano\n Gioacchino Vitale\n\n Classe IV B INF:\n Bruno Galluzzo\n\n Clicca per Chiudere").setOrigin(0).setTint(0x000000).setFontSize(12).setFontFamily("roboto").setWordWrapWidth(550);

        this._creditsContainer.add([_layer, _modal, _creditLabel, _creditDescription]);


        this.add.tween({
            targets:this._logo,
            alpha:1,
            duration:1000,
            ease:Phaser.Math.Easing.Cubic.InOut
        })

        
    

            }
            openCredits(){
                let _tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
                  targets: this._creditsContainer,
                  alpha: 1,
                  duration: 500,
                  onStart: () => { console.log("start"); },
                  onUpdate: () => { console.log("update"); },
                  onComplete: () => { console.log("complete"); }
                }
                this.tweens.add(_tweenConfig);
              }

              closeCredits(){

                let _tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
                  targets: this._creditsContainer,
                  alpha: 0,
                  duration: 500,
                  onStart: () => { console.log("start"); },
                  onUpdate: () => { console.log("update"); },
                  onComplete: () => { console.log("complete"); }
                }
                this.tweens.add(_tweenConfig);
              }

    update(){
        this._logo.angle += 1;
        this._background.tilePositionY+=5;
    }
}

