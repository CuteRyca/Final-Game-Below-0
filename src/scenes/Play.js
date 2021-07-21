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
        this.load.image('baby','./assets/baby.png');
        this.load.image('nest', './assets/nest.png');
        this.load.image('gameover', './assets/gameover.png');
    }
    create(){
        this.gameOver = false;
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
        this.baby = new Baby(this, game.config.width / 2, game.config.height*0.95,'baby', 0, 30).setOrigin(0,0);
        this.nest = new Nest(this, game.config.width / 2, game.config.height*0.95,'nest', 0, 30).setOrigin(0,0).setScale(0.7);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        //add score
        this.numberOfFish = 0;
        this.score = 0;
        this.scoreBoard = this.add.text(16, 16, 'Catch Fish:  ' + this.score, style);
        this.fishnum = 0;
        this.fishBoard = this.add.text(630, 600, 'Own Fish:  ' + this.fishnum, style);
    
        //set bgm
        //setting up bgm
        this.bgm = this.sound.add('music', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.bgm.play();
        var timer = this.time.addEvent({
            delay: 500,                // ms
            // timer length
            callback: this.updateCounter,
            //args: [],
            callbackScope: Play,
            loop: true
        });
        var winter = this.time.addEvent({
            delay: 30000,                // ms
            // timer length
            callback: this.winterCheck,
            //args: [],
            callbackScope: Play,
            loop: true
        });
    }
    update(){
        this.sea.tilePositionX +=2;

        if(!this.gameOver){
        this.mother.update();
        this.fish.update();
        this.shark.update();
        this.hook.update();
        this.baby.update();
        this.nest.update();
        }

        if(this.gameOver){
            this.scene.start("gameOverScene");
        }

        if(this.checkCollision(this.mother, this.fish)){
            this.eatFish(this.fish);
        }

        if(this.checkCollision(this.mother, this.shark)){
            this.sharkEat();
        }

        if(this.checkCollision(this.mother, this.hook)){
            this.touchHook(this.hook);
        }
        
        if(this.checkCollision(this.mother, this.nest)){
            this.arriveNest();
        }
        //game.config.height*0.7 is the height of cave
        /*if(this.mother.y<game.config.height*0.7&&this.score<this.fishnum){
            this.eatFood();
        }*/
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
        this.sound.play('eat');
        fish.reset();
        fish.alpha = 1;
        this.scoreBoard.destroy();
        this.score+=1;
        this.scoreBoard = this.add.text(16, 16, 'Catch Fish:  ' + this.score, style);
        this.numberOfFish = this.score;
    }
    checkCollision(mother, shark) {
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
        this.sound.play('die');
        this.bgm.stop();
        this.gameOver = true;
    }   
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
        this.bgm.stop();
        this.scene.start('skyScene');
    }
    checkCollision(mother, nest) {
        if (mother.x < nest.x + nest.width && 
            mother.x + mother.width > nest.x && 
            mother.y < nest.y + nest.height &&
            mother.height + mother.y > nest.y) {
                return true;
            }else {
            return false;
        }
    }
    arriveNest(){ 
        this.scoreBoard.destroy();
        this.score = 0;
        this.scoreBoard = this.add.text(16, 16, 'Catch Fish:  ' + this.score, style);
        this.fishBoard.destroy();
        this.fishnum = this.numberOfFish;
        this.fishBoard = this.add.text(630, 600, 'Own Fish:  ' + this.fishnum, style);
    }

    winterCheck() {

    }

    updateCounter() {
        if (Phaser.Math.RND.between(0, 10) < 1) {
            // fish eat chance
            this.eatFood;
            console.log('x');
        }
    }
    
    eatFood(){
        this.fishBoard.destroy();
        this.fishnum-=1;
        this.fishBoard = this.add.text(630, 600, 'Own Fish:  ' + this.fishnum, style);
    }
    
}