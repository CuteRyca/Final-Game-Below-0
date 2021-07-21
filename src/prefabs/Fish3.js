class Fish3 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 4;
    }
    update(){
        //move from left to right
        this.x -= this.moveSpeed;
        if(this.x <= 0){
            this.reset();
        }
    }

    reset(){
        this.x = game.config.width;
        this.y = Phaser.Math.Between(game.config.height*0.85, game.config.height*0.2);
    }
}