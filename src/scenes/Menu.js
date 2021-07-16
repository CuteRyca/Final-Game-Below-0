class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload(){
        this.load.image('menu', './assets/menu.png');
    }
    create(){
        this.menu = this.add.tileSprite(0, 0, 840, 640, 'menu').setOrigin(0,0);
        this.menu = this.add.text(16, 16, 'Hint: Be ware of Shark!', style).setOrigin(0,0);
        this.menu = this.add.text(230, 290, 'Press "UP Arrow" to start', style).setOrigin(0,0);
        this.menu = this.add.text(16, 50, 'Use arrow keys to control the penguin.', style).setOrigin(0,0);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.start('playScene');
        }
    }
}