export class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.canBeHurt = true;
        this.mailCollected = 0;
    }

    preload() {
        // Load tilemap
        this.load.tilemapTiledJSON("gameMap", "assets/tilemap/nightmare.json");

        // Load static sprites
        this.load.image("nightmare_spritesheet", "assets/tilemap/nightmare_spritesheet.png");
        this.load.image("door", "assets/png/door.png");
        this.load.image("key", "assets/png/key.png");
        this.load.image("ruinsBrick_broken", "assets/png/ruinsBrick_broken.png");
        this.load.image("ruinsBrick_normal", "assets/png/ruinsBrick_normal.png");
        this.load.image("ruinsTall_broken", "assets/png/ruinsTall_broken.png");
        this.load.image("ruinsTall_normal", "assets/png/ruinsTall_normal.png");
        this.load.image("tree_candle", "assets/png/tree_Candle.png");
        this.load.image("tree_normal", "assets/png/tree_Normal.png");
        this.load.image("tree_dead", "assets/png/tree_Dead.png");
        this.load.image("tree_fruit", "assets/png/tree_Fruit.png");
        this.load.image("tree_pine", "assets/png/tree_Pine.png");
        this.load.image("stella_dead", "assets/png/stella_Dead.png");
        this.load.image("mail", "assets/png/mail.png");

        // Load buttons
        this.load.image("button_pause", "assets/png/sign_Pause.png");
        this.load.image("button_resume", "assets/png/sign_Resume.png");
        this.load.image("button_sleepForever", "assets/png/sign_SleepForever.png");
        this.load.image("button_tryAgain", "assets/png/sign_TryAgain.png");

        // Load animated sprites
        this.load.spritesheet("mob_hand", "assets/png/mob_Hand.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("mob_skull", "assets/png/mob_Skull.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("mob_slug", "assets/png/mob_Slug.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("mailbox", "assets/png/mailbox.png", { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet("stella_walkBack", "assets/png/stella_WalkBack.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("stella_walkFront", "assets/png/stella_WalkFront.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("stella_walkLeft", "assets/png/stella_WalkLeft.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("stella_walkRight", "assets/png/stella_WalkRight.png", { frameWidth: 32, frameHeight: 32 });

        // Load audio
        this.load.audio("game_bgm", "assets/audio/Lonely little music boxoct1.wav");
        this.load.audio("button_click", "assets/audio/click on.wav");
        this.load.audio("getting_closer", "assets/audio/getting closer.wav");
        this.load.audio("hurt_sfx", "assets/audio/Undertale - Soul Damage Sound Effect.wav");
        this.load.audio("key_drop", "assets/audio/Key Drop OMORI SFX.wav");
        this.load.audio("mail_pickup", "assets/audio/Page Turn OMORI SFX.wav");
        this.load.audio("door_opened", "assets/audio/Unlocking Door OMORI SFX.wav");
    }

    create() {
        const map = this.make.tilemap({ key: "gameMap" });
        const tileset = map.addTilesetImage("nightmare_spritesheet", "nightmare_spritesheet");

        // Load tile layers
        const groundTile = map.createLayer("groundTile", tileset, 0, 0);
        const waterTile = map.createLayer("waterTile", tileset, 0, 0);
        const bridgeTile = map.createLayer("bridgeTile", tileset, 0, 0);

        // Water tile collision
        waterTile.setCollisionByProperty({ collidesWater: true });

        // Player and mob animations
        this.anims.create({
            key: "stella_walkBack",
            frames: this.anims.generateFrameNumbers("stella_walkBack", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "stella_walkFront",
            frames: this.anims.generateFrameNumbers("stella_walkFront", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "stella_walkLeft",
            frames: this.anims.generateFrameNumbers("stella_walkLeft", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "stella_walkRight",
            frames: this.anims.generateFrameNumbers("stella_walkRight", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "mob_hand_anim",
            frames: this.anims.generateFrameNumbers("mob_hand", { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "mob_skull_anim",
            frames: this.anims.generateFrameNumbers("mob_skull", { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "mob_slug_anim",
            frames: this.anims.generateFrameNumbers("mob_slug", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        // Load objects
        this.loadObjects(map, "keyObj", "key");
        this.loadObjects(map, "doorObj", "door");
        this.loadObjects(map, "mailboxObj", "mailbox");
        this.loadObjects(map, "mailObj", "mail");
        this.loadObjects(map, "trees_normalObj", "tree_normal");
        this.loadObjects(map, "trees_fruitObj", "tree_fruit");
        this.loadObjects(map, "trees_deadObj", "tree_dead");
        this.loadObjects(map, "trees_candleObj", "tree_candle");
        this.loadObjects(map, "trees_pineObj", "tree_pine");
        this.loadObjects(map, "mob_skullObj", "mob_skull", "mob_skull_anim", true);
        this.loadObjects(map, "mob_slugObj", "mob_slug", "mob_slug_anim", true);
        this.loadObjects(map, "mob_handObj", "mob_hand", "mob_hand_anim", true);
        this.loadObjects(map, "ruinsTall_normalObj", "ruinsTall_normal");
        this.loadObjects(map, "ruinsTall_brokenObj", "ruinsTall_broken");
        this.loadObjects(map, "ruinsBrick_normalObj", "ruinsBrick_normal");
        this.loadObjects(map, "ruinsBrick_brokenObj", "ruinsBrick_broken");

        // Load player object
        this.loadObjects(map, "playerObj", "stella_walkFront", "stella_walkFront", true);
        
        // Set world bounds
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Stop menu BGM, and play game BGM
        const menuBgm = this.sound.get('menu_bgm');
        if (menuBgm) {
            menuBgm.stop();
        }

        this.gameBgm = this.sound.add('game_bgm', { loop: true });
        this.gameBgm.play();

        // Setup keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Add text UI for mail collected
        this.mailText = this.add.text(10, 10, 'Mail collected: 0/10', { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);

        // Add colliders
        this.physics.add.collider(this.player, waterTile);
        this.addColliders(map);
    }

    loadObjects(map, objectLayerName, spriteName, animKey = null, animated = false) {
        const objects = map.getObjectLayer(objectLayerName).objects;
        objects.forEach(object => {
            const sprite = this.physics.add.sprite(object.x, object.y, spriteName);
            sprite.setOrigin(0.5, 0.75);
            if (objectLayerName === "playerObj") {
                this.player = sprite; 
            }
            if (animated && animKey) {
                sprite.play(animKey);
            }
        });
    }

    addColliders(map) {
        const collidableObjects = [
            { name: "trees_normalObj", width: 2 },
            { name: "trees_fruitObj", width: 2 },
            { name: "trees_deadObj", width: 2 },
            { name: "trees_candleObj", width: 2 },
            { name: "trees_pineObj", width: 2 },
            { name: "ruinsTall_normalObj", width: 1 },
            { name: "ruinsTall_brokenObj", width: 1 },
            { name: "ruinsBrick_normalObj", width: 1 },
            { name: "ruinsBrick_brokenObj", width: 1 },
            { name: "doorObj", width: 1 },
            { name: "mailboxObj", width: 1 },
        ];

        collidableObjects.forEach(obj => {
            const objects = map.getObjectLayer(obj.name).objects;
            objects.forEach(object => {
                const collider = this.add.rectangle(object.x, object.y, object.width * obj.width, object.height, 0x0000ff, 0);
                this.physics.add.existing(collider, true);
                this.physics.add.collider(this.player, collider);
            });
        });
    }

    update() {
        this.player.body.setVelocity(0);

        if (this.keys.W.isDown) {
            this.player.body.setVelocityY(-160);
            this.player.anims.play("stella_walkBack", true);
        } else if (this.keys.S.isDown) {
            this.player.body.setVelocityY(160);
            this.player.anims.play("stella_walkFront", true);
        } else if (this.keys.A.isDown) {
            this.player.body.setVelocityX(-160);
            this.player.anims.play("stella_walkLeft", true);
        } else if (this.keys.D.isDown) {
            this.player.body.setVelocityX(160);
            this.player.anims.play("stella_walkRight", true);
        } else {
            this.player.anims.stop();
        }
    }
}
