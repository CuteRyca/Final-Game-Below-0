class Hook extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, eaglePoint){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
    }
    update(){
        //move from above to bottom
        this.y += this.moveSpeed;
        if(this.y >= game.config.height/4){
            this.reset();
        }
    }

    reset(){
        //reset on the top
        this.y = 0;
        this.x = Phaser.Math.Between(0, game.config.width);
    }
}