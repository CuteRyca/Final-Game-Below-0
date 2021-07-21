class Sky extends Phaser.Scene {
    constructor(){
        super("skyScene");
    }
    preload(){
        // load images/tile sprites
        this.load.image('sky','./assets/Room2BgSky.png');
        this.load.image('mother', './assets/mother.png');
        this.load.image('bird', './assets/bird.png');
        this.load.image('back', './assets/back.png');
        this.load.image('hunter', './assets/birdhunter.png');
    }
    create(){
        this.bgm = this.sound.add('music', { 
            mute: false,
            volume: 0.25,
            rate: 1,
            loop: true 
        });
        this.bgm.play();
        this.sky = this.add.tileSprite(0, 0, 840, 640, 'sky').setOrigin(0, 0);
        this.bird = new Bird(this, game.config.width + 60, 50,'bird', 0, 30).setOrigin(0,0);
        this.mother = new Mother(this, game.config.width / 2, game.config.height*0.95, 'mother').setOrigin(0.5, 0);
        this.back = new Back(this, game.config.width / 2, game.config.height*0.95,'back', 0, 30).setOrigin(0,0);
        this.hunter = new Hunter(this, 0, 50,'hunter', 0, 30).setOrigin(0,0);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

       
    }
    update(){
        this.sky.tilePositionX +=2;
        if(!this.gameOver){
        this.mother.update();
        this.bird.update();
        this.back.update();
        this.hunter.update();
        }
        if(this.gameOver){
            this.scene.start("gameOverScene");
        }
        if(this.checkCollision(this.mother, this.bird)){
            this.eatBird(this.bird);
        }
        if(this.checkCollision(this.mother, this.back)){
            this.touchNest(this.back);
        }
        if(this.checkCollision(this.mother, this.hunter)){
            this.hunterEat();
        }
    }
    checkCollision(mother, bird) {
        if (mother.x < bird.x + bird.width && 
            mother.x + mother.width > bird.x && 
            mother.y < bird.y + bird.height &&
            mother.height + mother.y > bird.y) {
                return true;
            }else {
            return false;
        }
    }

    eatBird(bird){
        bird.alpha = 0;
        this.sound.play('die');
        bird.reset();
        bird.alpha = 1;
    }
    checkCollision(mother, back) {
        if (mother.x < back.x + back.width && 
            mother.x + mother.width > back.x && 
            mother.y < back.y + back.height &&
            mother.height + mother.y > back.y) {
                return true;
            }else {
            return false;
        }
    }
    touchNest(back){
        back.alpha =0;
        this.bgm.stop();
        this.scene.start('playScene');
    }

    checkCollision(mother, hunter) {
        if (mother.x < hunter.x + hunter.width && 
            mother.x + mother.width > hunter.x && 
            mother.y < hunter.y + hunter.height &&
            mother.height + mother.y > hunter.y) {
                return true;
        } else {
            return false;
        }
    }
    hunterEat(){
        this.sound.play('die');
        this.bgm.stop();
        this.gameOver = true;
    }   
}