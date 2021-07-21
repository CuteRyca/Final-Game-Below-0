class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        // load images/tile sprites
        this.load.image('sea','./assets/new_bg.png');
        this.load.image('mother', './assets/mother.png');
        this.load.image('fish1','./assets/fish1.png');
        this.load.image('fish2','./assets/fish2.png');
        this.load.image('fish3','./assets/fish3.png');
        this.load.image('trash','./assets/trash_can.png');
        this.load.image('bulb','./assets/light_bulb.png');
        this.load.image('shark','./assets/shark.png');
        this.load.image('hook','./assets/hook1.png');
        this.load.image('baby','./assets/baby.png');
        this.load.image('nest', './assets/nest.png');
        this.load.image('zero','./assets/zero.png');
        this.load.image('gameover', './assets/gameover.png');
        this.load.spritesheet('bubble', './assets/bubbles_sheet.png', {frameWidth: 64,
            frameHeight: 64, startFrame: 0, endFrame: 10});
    }
    create(){
        
        this.gameOver = false;
        //add background,mother,fish
        
        this.sea = this.add.tileSprite(0, 0, 840, 640, 'sea').setOrigin(0, 0);
        this.mother = new Mother(this, game.config.width / 2, game.config.height*0.95, 'mother').setOrigin(0.5, 0).setScale(1.3);
    	//game.physics.enable(mother, Phaser.Physics.ARCADE);
        this.fish1 = new Fish1(this, game.config.width + 60, 50,'fish1', 0, 30).setOrigin(0,0).setScale(1.2);
        this.fish2 = new Fish2(this, game.config.width + 60, 50,'fish2', 0, 30).setOrigin(0,0).setScale(0.9);
        this.fish3 = new Fish3(this, game.config.width + 60, 50,'fish3', 0, 30).setOrigin(0,0).setScale(1.4);
        this.trash = new Trash(this, game.config.width + 60, 50,'trash', 0, 30).setOrigin(0,0).setScale(1.2);
        this.bulb = new Bulb(this, game.config.width + 60, 50,'bulb', 0, 30).setOrigin(0,0).setScale(1.2);
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
        
        //eating animation
        this.anims.create({
            key: 'eatingfish', 
            frames: this.anims.generateFrameNumbers('bubble',{start: 0, end: 10, 
            first: 0}),
            frameRate: 30});

        //baby eats fish timer
        this.babyEat = this.time.addEvent({ delay: 5000, callback: this.updateCounter, callbackScope: this, loop: true});
        this.winter = this.time.addEvent({ delay: 25000, callback: this.winterTimer, callbackScope: this, loop: true});
        this.check = this.time.addEvent({ delay: 30000, callback: this.winterCheck, callbackScope: this, loop: true});
    }
    update(){
        this.sea.tilePositionX +=0;

        if(!this.gameOver){
        this.mother.update();
        this.fish1.update();
        this.fish2.update();
        this.fish3.update();
        this.shark.update();
        this.hook.update();
        this.baby.update();
        this.nest.update();
        this.trash.update();
        this.bulb.update();
        }

        if(this.gameOver){
            this.scene.start("gameOverScene");
        }

        if(this.checkCollision(this.mother, this.fish1)){
            this.eatFish1(this.fish1);
        }
        if(this.checkCollision(this.mother, this.fish2)){
            this.eatFish2(this.fish2);
        }
        if(this.checkCollision(this.mother, this.fish3)){
            this.eatFish3(this.fish3);
        }
        if(this.checkCollision(this.mother, this.shark)){
            this.sharkEat();
        }
        if(this.checkCollision(this.mother, this.trash)){
            this.trashEat();
        }
        if(this.checkCollision(this.mother, this.bulb)){
            this.trashEat();
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
    checkCollision(mother, fish2) {
        if (mother.x < fish2.x + fish2.width && 
            mother.x + mother.width > fish2.x && 
            mother.y < fish2.y + fish2.height &&
            mother.height + mother.y > fish2.y) {
                return true;
            }else {
            return false;
        }
    }
    eatFish2(fish2){
        let boom = this.add.sprite(this.mother.x, this.mother.y, 'bubble').setOrigin(0,0);
        boom.anims.play('eatingfish');
        boom.on('animationcomplete', () => {
            boom.destroy();
        });
        fish2.alpha = 0;
        this.sound.play('eat');
        fish2.reset();
        fish2.alpha = 1;
        this.scoreBoard.destroy();
        this.score-=1;
        this.scoreBoard = this.add.text(16, 16, 'Catch Fish:  ' + this.score, style);
        this.numberOfFish = this.score;
    }
    checkCollision(mother, fish3) {
        if (mother.x < fish3.x + fish3.width && 
            mother.x + mother.width > fish3.x && 
            mother.y < fish3.y + fish3.height &&
            mother.height + mother.y > fish3.y) {
                return true;
            }else {
            return false;
        }
    }
    eatFish3(fish3){
        let boom = this.add.sprite(this.mother.x, this.mother.y, 'bubble').setOrigin(0,0);
        boom.anims.play('eatingfish');
        boom.on('animationcomplete', () => {
            boom.destroy();
        });
        fish3.alpha = 0;
        this.sound.play('eat');
        fish3.reset();
        fish3.alpha = 1;
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
    checkCollision(mother, trash) {
        if (mother.x < trash.x + trash.width && 
            mother.x + mother.width > trash.x && 
            mother.y < trash.y + trash.height &&
            mother.height + mother.y > trash.y) {
                return true;
        } else {
            return false;
        }
    } 
    checkCollision(mother, bulb) {
        if (mother.x < bulb.x + bulb.width && 
            mother.x + mother.width > bulb.x && 
            mother.y < bulb.y + bulb.height &&
            mother.height + mother.y > bulb.y) {
                return true;
        } else {
            return false;
        }
    } 
    trashEat(){
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
    winterTimer(){
        this.winter = this.add.sprite(game.config.width/2,game.config.height/2,'zero');
    }
    winterCheck() {
       
        if(this.fishnum < 3){
            this.bgm.stop();
            this.gameOver = true;
        }else{
            this.winter.alpha = 0;
            this.scoreBoard.destroy();
            this.score = 0;
            this.scoreBoard = this.add.text(16, 16, 'Catch Fish:  ' + this.score, style);
            this.fishBoard.destroy();
            this.fishnum =0;
            this.fishBoard = this.add.text(630, 600, 'Own Fish:  ' + this.fishnum, style);
        }
        console.log('y');
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