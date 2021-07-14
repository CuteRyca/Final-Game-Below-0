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
        this.fish = new Fish(this, game.config.width + 60, 50,'fish', 0, 30).setOrigin(0,0);
        this.shark = new Shark(this, 0, 50,'shark', 0, 30).setOrigin(0,0);
        this.hook = new Hook(this,  game.config.width / 2, 0,'hook', 0, 30).setScale(1.5);
        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
    }
    update(){
        this.sea.tilePositionX +=2;
        this.mother.update();
        this.fish.update();
        this.shark.update();
        this.hook.update();
    }
}