class Sky extends Phaser.Scene {
    constructor(){
        super("skyScene");
    }
    preload(){
        // load images/tile sprites
        this.load.image('sky','./assets/Room2BgSky.png');
        this.load.image('mother', './assets/mother.png');
        this.load.image('bird', './assets/bird.png');
        this.load.image('nest', './assets/nest.png');
    }
    create(){
        this.sky = this.add.tileSprite(0, 0, 840, 640, 'sea').setOrigin(0, 0);
        this.bird = new Bird(this, game.config.width + 60, 50,'bird', 0, 30).setOrigin(0,0);
        this.mother = new Mother(this, game.config.width / 2, game.config.height*0.95, 'mother').setOrigin(0.5, 0);
        this.nest = new Nest(this, game.config.width / 2, game.config.height*0.95,'nest', 0, 30).setOrigin(0,0);
        
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

       
    }
    update(){
        this.sky.tilePositionX +=2;
        this.mother.update();
        this.bird.update();
        this.nest.update();

        if(this.checkCollision(this.mother, this.bird)){
            this.eatBird(this.bird);
        }
        if(this.checkCollision(this.mother, this.nest)){
            this.touchNest(this.nest);
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
        bird.reset();
        bird.alpha = 1;
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
    touchNest(nest){
        nest.alpha =0;
        this.scene.start('playScene');
    }
}