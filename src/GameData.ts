export let GameData:gameData = {
    globals: {
        gameWidth: 900,
        gameHeight: 600,
        bgColor: "#ffffff",
        debug: true
      },
      
      spritesheets: [
        //metti qui gli spirtesheet cosi
        //{ name: "player", path: "assets/images/player.png", width: 82, height: 70, frames: 50 },
  
      ],

      images: [
        {name: "player",path:"assets/images/ship.png"},
        {name: "background", path:"assets/images/bg/bg.png"},
        {name: "logo", path:"assets/images/logo-phaser.png"},
        {name: "enemy",path:"assets/images/enemy.svg"},
        {name: "bullet", path:"assets/images/bullet.png"},
        {name: "platform", path:"assets/images/platform.png"},
        {name: "life", path:"assets/images/life.png"}
          
      ],
      atlas: [],
      sounds: [

      ],
    
      videos: [
      ],

      audios: [
      ],
    
      scripts: [],
      fonts: [{ key: 'Nosifer' }, { key: 'Roboto' }, { key: 'Press+Start+2P' }, { key: 'Rubik+Doodle+Shadow' }, { key: 'Rubik+Glitch' }, {key:'Oswald'}],
      bitmapfonts: [{name:"arcade",
                     imgpath:"assets/fonts/arcade.png",
                     xmlpath:"assets/fonts/arcade.xml"}],
}
