class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/menu.png');
        this.load.audio('music', './assets/bgm.mp3');
        this.load.audio('die', './assets/baby_start.wav');
        this.load.audio('eattrash', './assets/mother_bite.mp3');
        this.load.audio('eatgood', './assets/eat_good.wav');
        this.load.audio('putfish', './assets/put_fish.wav');
    }
    create(){
        this.menu = this.add.tileSprite(0, 0, 840, 640, 'menu').setOrigin(0,0);
        this.menu = this.add.text(16, 16, 'Art: LI Rayna', style).setOrigin(0,0);
        this.menu = this.add.text(210, 290, 'Press "RIGHT Arrow" to next', style).setOrigin(0,0);
        this.menu = this.add.text(16, 50, 'Progranmmer: Ryca Zhang, Derek Tran', style).setOrigin(0,0);
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keySTART)){
            this.scene.start('controlScene');
        }
    }
}