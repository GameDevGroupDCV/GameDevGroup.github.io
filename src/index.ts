//importiamo la libreria phaser
import "phaser";
//importiamo le nostre scene
import Hud from "./scenes/Hud";
import Preloader from "./scenes/Preloader";
import Intro from "./scenes/Intro";
import GamePlay from "./scenes/GamePlay";
//importiamo GameData che contiene i valori globali del gioco
import { GameData } from "./GameData";
import GameOver from "./scenes/GameOver";

//il listener per l'evento load della pagina
//questo evento viene lanciato quando la pagina è stata caricata
//e tutti gli elementi della pagina sono disponibili
window.addEventListener("load", () => {


  //creiamo un oggetto di configurazione per il gioco
  //questo oggetto viene passato al costruttore di Phaser.Game
  // e contiene i parametri di configurazione del gioco
  // come il tipo di rendering, le dimensioni del canvas, le scene, ecc.
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },

    scene: [
        Preloader,
        Intro,
        Hud, 
        GamePlay,
        GameOver
    ],
    physics: {
      default: "arcade",
      arcade: { debug: GameData.globals.debug, }
    },

    input: {
      activePointers: 2,
      keyboard: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };

  //inizializziamo il gioco passando la configurazione
  const game = new Phaser.Game(config);

});
