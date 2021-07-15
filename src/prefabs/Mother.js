class Mother extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 3; //pixels per frame
    }
    update(){
        //movement
        if(keyLEFT.isDown && this.x >= borderUISize+ this.width){
                this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= game.config.width - (borderUISize + this.width)){
                this.x += this.moveSpeed;
        } else if(keyUP.isDown && this.y >= borderUISize * 3 + borderPadding){
                this.y -= this.moveSpeed;
        } else if(keyDOWN.isDown && this.y <= game.config.height - this.height){
                this.y +=this.moveSpeed;
        }
    }
}