class Fish extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 6;
    }
    update(){
        //move from left to right
        this.x += this.moveSpeed;
        if(this.x >= game.config.width){
            this.reset();
        }
    }

    reset(){
        this.x = 0;
        this.y = Phaser.Math.Between(game.config.height * 0.8, game.config.height * 0.3);
    }
}