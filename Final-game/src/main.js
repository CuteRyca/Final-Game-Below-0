let config = {
  type: Phaser.CANVAS,
  width: 840,
  height: 640,
  physics: {
    default: "arcade"
},
  scene: [Play, Sky]
}
  
let game = new Phaser.Game(config);
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let style = { font: "bold 32px Arial", fill: "#fff" };
let x = 0;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;