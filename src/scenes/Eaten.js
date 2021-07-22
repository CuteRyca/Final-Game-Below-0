class Eaten extends Phaser.Scene {
    constructor() {
        super('eatenScene');
    }
   
    create(){
        this.eaten = this.add.tileSprite(0, 0, 840, 640, 'eatendead').setOrigin(0,0);
        //press up arrow return to menu
        this.keyPUT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.menu = this.add.text(200, 290, 'Press "Down Arrow" to play again.', style).setOrigin(0,0);
    }
    update(){
        this.eaten.tilePositionX += 0;
        //game over scene will print the total score
        if(Phaser.Input.Keyboard.JustDown(this.keyPUT)){
            this.scene.start('menuScene');
        }
    }
}