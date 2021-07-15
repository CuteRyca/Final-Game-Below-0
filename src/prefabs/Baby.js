class Baby extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    update(){
        this.x = borderUISize+ this.width;
        this.y = game.config.height*0.92;
    }
}