class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        // load images/tile sprites
        this.load.image('sea','./assets/new_bg.png');
        this.load.image('mother', './assets/mother.png');
        this.load.image('fish1','./assets/fish1.png');
        this.load.image('shark','./assets/shark.png');
        this.load.image('hook','./assets/hook1.png');
        this.load.image('baby','./assets/baby.png');
        this.load.image('nest', './assets/nest.png');
        this.load.image('gameover', './assets/gameover.png');
        this.load.spritesheet('bubble', './assets/bubbles_sheet.png', {frameWidth: 64,
            frameHeight: 64, startFrame: 0, endFrame: 10});
    }
    create(){
        
        this.gameOver = false;
        //add background,mother,fish
        this.sea = this.add.tileSprite(0, 0, 840, 640, 'sea').setOrigin(0, 0);
        this.mother = new Mother(this, game.config.width / 2, game.config.height*0.95, 'mother').setOrigin(0.5, 0);
    	//game.physics.enable(mother, Phaser.Physics.ARCADE);
        this.fish1 = new Fish1(this, game.config.width + 60, 50,'fish1', 0, 30).setOrigin(0,0);
        //game.physics.enable(this.fish, Phaser.Physics.ARCADE);
        this.shark = new Shark(this, 0, 50,'shark', 0, 30).setOrigin(0,0).setScale(0.8);
        //game.physics.enable(Shark, Phaser.Physics.ARCADE);
        this.hook = new Hook(this,  game.config.width / 2, 0,'hook', 0, 30).setScale(1.5);
    	//game.physics.enable(hook, Phaser.Physics.ARCADE);
        this.baby = new Baby(this, game.config.width / 2, game.config.height*0.95,'baby', 0, 30).setOrigin(0,0);
        this.nest = new Nest(this, game.config.width / 2, game.config.height*0.95,'nest', 0, 30).setOrigin(0,0).setScale(0.7);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyPUT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
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

        this.anims.create({
            key: 'eatingfish', 
            frames: this.anims.generateFrameNumbers('bubble',{start: 0, end: 10, 
            first: 0}),
            frameRate: 30});

        //baby eats fish timer
        this.babyEat = this.time.addEvent({ delay: 5000, callback: this.updateCounter, callbackScope: this, loop: true});
    }
    update(){
        this.sea.tilePositionX +=0;

        if(!this.gameOver){
        this.mother.update();
        this.fish1.update();
        this.shark.update();
        this.hook.update();
        this.baby.update();
        this.nest.update();
        
        }

        if(this.gameOver){
            this.scene.start("gameOverScene");
        }

        if(this.checkCollision(this.mother, this.fish1)){
            this.eatFish1(this.fish1);
        }

        if(this.checkCollision(this.mother, this.shark)){
            this.sharkEat();
        }

        if(this.checkCollision(this.mother, this.hook)){
            this.touchHook(this.hook);
        }
        
        if(this.checkCollision(this.mother, this.nest)&&Phaser.Input.Keyboard.JustDown(this.keyPUT)){
            this.arriveNest();
        }
        //game.config.height*0.7 is the height of cave
        /*if(this.mother.y<game.config.height*0.7&&this.score<this.fishnum){
            this.eatFood();
        }*/
    }

    checkCollision(mother, fish1) {
        if (mother.x < fish1.x + fish1.width && 
            mother.x + mother.width > fish1.x && 
            mother.y < fish1.y + fish1.height &&
            mother.height + mother.y > fish1.y) {
                return true;
            }else {
            return false;
        }
    }

    eatFish1(fish1){
        let boom = this.add.sprite(this.mother.x, this.mother.y, 'bubble').setOrigin(0,0);
        boom.anims.play('eatingfish');
        boom.on('animationcomplete', () => {
            boom.destroy();
        });
        fish1.alpha = 0;
        this.sound.play('eat');
        fish1.reset();
        fish1.alpha = 1;
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
        this.fishnum += this.numberOfFish;
        this.fishBoard = this.add.text(630, 600, 'Own Fish:  ' + this.fishnum, style);
    }

    winterCheck() {

    }

    updateCounter() {
        if (Phaser.Math.RND.between(0, 10) < 5) {
            // fish eat chance
            this.fishBoard.destroy();
            this.fishnum-=1;
            this.fishBoard = this.add.text(630, 600, 'Own Fish:  ' + this.fishnum, style);
            
        }
        console.log('x');
        
    }
    
    
    
}