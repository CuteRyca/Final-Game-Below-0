class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        // load images/tile sprites
        this.load.image('sea','./assets/background.png');
        this.load.image('mother', './assets/mother.png');
        this.load.image('fish','./assets/fish1.png');
        this.load.image('shark','./assets/shark.png');
        this.load.image('hook','./assets/hook1.png');
    }
    create(){

        //add background,mother,fish
        this.sea = this.add.tileSprite(0, 0, 840, 640, 'sea').setOrigin(0, 0);
        this.mother = new Mother(this, game.config.width / 2, game.config.height*0.95, 'mother').setOrigin(0.5, 0);
    	//game.physics.enable(mother, Phaser.Physics.ARCADE);
        this.fish = new Fish(this, game.config.width + 60, 50,'fish', 0, 30).setOrigin(0,0);
        //game.physics.enable(this.fish, Phaser.Physics.ARCADE);
        this.shark = new Shark(this, 0, 50,'shark', 0, 30).setOrigin(0,0);
        //game.physics.enable(Shark, Phaser.Physics.ARCADE);
        this.hook = new Hook(this,  game.config.width / 2, 0,'hook', 0, 30).setScale(1.5);
    	//game.physics.enable(hook, Phaser.Physics.ARCADE);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        //add score
        this.score = 0;
        this.scoreBoard = this.add.text(16, 16, 'Fish:  ' + this.score, style);
    }
    update(){
        this.sea.tilePositionX +=2;
        this.mother.update();
        this.fish.update();
        this.shark.update();
        this.hook.update();

        if(this.checkCollision(this.mother, this.fish)){
            this.eatFish(this.fish);
        }

        /*if(this.checkCollision(this.mother, this.shark)){
        }*/

        if(this.checkCollision(this.mother, this.hook)){
            this.touchHook(this.hook);
        }
    }

    checkCollision(mother, fish) {
        if (mother.x < fish.x + fish.width && 
            mother.x + mother.width > fish.x && 
            mother.y < fish.y + fish.height &&
            mother.height + mother.y > fish.y) {
                return true;
            }else {
            return false;
        }
    }

    eatFish(fish){
        fish.alpha = 0;
        fish.reset();
        fish.alpha = 1;
        this.scoreBoard.destroy();
        this.score+=1;
        this.scoreBoard = this.add.text(16, 16, 'Fish:  ' + this.score, style);
        x = this.score;
    }
/*checkCollision(mother, shark) {
    if (mother.x < shark.x + shark.width && 
        mother.x + mother.width > shark.x && 
        mother.y < shark.y + shark.height &&
        mother.height + mother.y > shark.y) {
            return true;
    } else {
        return false;
    }
}
sharkEat(){
    
}*/
    checkCollision(mother, hook) {
        if (mother.x < hook.x + hook.width && 
            mother.x + mother.width > hook.x && 
            mother.y < hook.y + hook.height &&
            mother.height + mother.y > hook.y) {
                return true;
        } else {
            return false;
        }
    }
    touchHook(hook){
        hook.reset();
        this.scene.start('skyScene');
    }
}