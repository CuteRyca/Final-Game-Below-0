class Bulb extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 1;
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
        this.y = Phaser.Math.Between(game.config.height * 0.7, game.config.height * 0.2);
    }
}