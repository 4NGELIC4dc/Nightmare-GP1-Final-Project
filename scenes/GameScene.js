export class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
        this.canHurt = true;
    }

    preload(){
        // Load tilemap
        this.load.tilemapTiledJSON("gameMap", "assets/tilemap/nightmare.json")

        // Load static sprites
        this.load.image("nightmare_spritesheet", "assets/png/nightmare_spritesheet.png")
        this.load.image("heart", "assets/png/heart.png");
        this.load.image("door", "assets/png/door.png");
        this.load.image("key", "assets/png/door.png");
        this.load.image("ruinsBrick_broken", "assets/png/ruinsBrick_broken.png");
        this.load.image("ruinsBrick_normal", "assets/png/ruinsBrick_normal.png");
        this.load.image("ruinsTall_broken", "assets/png/ruinsTall_broken.png");
        this.load.image("ruinsTall_normal", "assets/png/ruinsTall_normal.png");
        this.load.image("stella_dead", "assets/png/stella_Dead.png")

        // Load buttons
        this.load.image("button_pause", "assets/png/sign_Pause.png");
        this.load.image("button_resume", "assets/png/sign_Resume.png");
        this.load.image("button_sleepForever", "assets/png/sign_SleepForever.png");
        this.load.image("button_tryAgain", "assets/png/sign_TryAgain.png");

        // Load animated sprites
        this.load.spritesheet("mob_Hand", "assets/png/mob_Hand.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("mob_Skull", "assets/png/mob_Skull.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("mob_Slug", "assets/png/mob_Slug.png", {frameWidth: 96, frameHeight: 96});
        this.load.spritesheet("mail", "assets/png/mail.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("mailbox", "assets/png/mailbox.png", {frameWidth: 32, frameHeight: 64});
        this.load.spritesheet("stella_walkBack", "assets/png/stella_WalkBack.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("stella_walkFront", "assets/png/stella_WalkFront.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("stella_walkLeft", "assets/png/stella_WalkLeft.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("stella_walkRight", "assets/png/stella_WalkRight.png", {frameWidth: 32, frameHeight: 32});
    
        // Load audio
        this.load.audio("game_bgm", "assets/audio/Lonely little music boxoct1.wav");
        this.load.audio("button_click", "assets/audio/click on.wav");
        this.load.audio("getting_closer", "assets/audio/getting closer.wav");
        this.load.audio("hurt", "assets/audio/hurt_sfx.mp3");
    }

    create(){

    }

    update(){

    }
}