class Control extends Phaser.Scene {
    constructor() {
      super("controlScene");
    }
    preload(){
        this.load.image('control', './assets/new_control.png');
       
    }
    create(){
        this.control = this.add.tileSprite(0, 0, 840, 640, 'control').setOrigin(0,0);
       
        this.keySTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keySTART)){
            this.scene.start('playScene');
        }
    }
}