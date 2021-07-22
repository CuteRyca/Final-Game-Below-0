class Nest extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    update(){
        this.x = game.config.width-borderUISize*5;
        this.y = game.config.height*0.75;
    }
}