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
        this.load.spritesheet("mob_hand", "assets/png/mob_Hand.png", { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet("mob_skull", "assets/png/mob_Skull.png", { frameWidth: 96, frameHeight: 96 });
        this.load.spritesheet("mob_slug", "assets/png/mob_Slug.png", { frameWidth: 96, frameHeight: 96 });
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

        const groundTile = map.createLayer("groundTile", tileset, 0, 0);
        const waterTile = map.createLayer("waterTile", tileset, 0, 0);
        const bridgeTile = map.createLayer("bridgeTile", tileset, 0, 0);
        
        // Load all objects
        this.loadObjects(map, "playerObj", "stella_walkFront", true, true, 1);
        this.loadObjects(map, "keyObj", "key");
        this.loadObjects(map, "doorObj", "door");
        this.loadObjects(map, "mailboxObj", "mailbox");
        this.loadObjects(map, "mailObj", "mail");
        this.loadObjects(map, "trees_normalObj", "tree_normal");
        this.loadObjects(map, "trees_fruitObj", "tree_fruit");
        this.loadObjects(map, "trees_deadObj", "tree_dead");
        this.loadObjects(map, "trees_candleObj", "tree_candle");
        this.loadObjects(map, "trees_pineObj", "tree_pine");
        this.loadObjects(map, "mob_skullObj", "mob_skull", true);
        this.loadObjects(map, "mob_slugObj", "mob_slug", true);
        this.loadObjects(map, "mob_handObj", "mob_hand", true);
        this.loadObjects(map, "ruinsTall_normalObj", "ruinsTall_normal");
        this.loadObjects(map, "ruinsTall_brokenObj", "ruinsTall_broken");
        this.loadObjects(map, "ruinsBrick_normalObj", "ruinsBrick_normal");
        this.loadObjects(map, "ruinsBrick_brokenObj", "ruinsBrick_broken");

        // Create colliders with adjustments
        this.createObjectColliders(map, "trees_normalObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "trees_fruitObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "trees_deadObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "trees_candleObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "trees_pineObj", { width: 32, height: 32 });
        this.createObjectColliders(map, "ruinsTall_normalObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "ruinsTall_brokenObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "ruinsBrick_normalObj", { width: 32, height: 32 });
        this.createObjectColliders(map, "ruinsBrick_brokenObj", { width: 32, height: 32 });
        this.createObjectColliders(map, "doorObj", { width: 32, height: 64 });
        this.createObjectColliders(map, "mailboxObj", { width: 32, height: 64 });

        waterTile.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, waterTile);

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

        // Create mail group
        this.createMail(map.getObjectLayer("mailObj").objects);

        // Add text UI for mail collected
        this.mailText = this.add.text(10, 10, 'Mail collected: 0/10', { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);
    }

    loadObjects(map, objLayerName, spriteKey, isAnimated = false, isPlayer = false, scale = 1) {
        const objectLayer = map.getObjectLayer(objLayerName);
        if (!objectLayer) {
            return;
        }

        objectLayer.objects.forEach(obj => {
            const sprite = this.physics.add.sprite(obj.x - obj.width * 1, obj.y, spriteKey); // Adjust x position
            sprite.setOrigin(0, 1); 
            sprite.setScale(scale);
            if (isPlayer) {
                this.player = sprite;
            }
            if (isAnimated) {
                sprite.anims.play(spriteKey, true);
            }
        });
    }

    createObjectColliders(map, objLayerName, size) {
        const objectLayer = map.getObjectLayer(objLayerName);
        if (!objectLayer) {
            return;
        }

        objectLayer.objects.forEach(obj => {
            const sprite = this.physics.add.sprite(obj.x - obj.width * 0.5, obj.y, objLayerName); // Adjust x position
            sprite.setOrigin(0, 1); 
            sprite.body.setImmovable(true);
            sprite.body.setAllowGravity(false);

            // Adjust collider size to be half of the image height
            const colliderHeight = size.height / 2;
            sprite.body.setSize(size.width, colliderHeight); 

            // Offset the collider to the bottom half of the image
            sprite.body.setOffset(0, colliderHeight);

            sprite.setVisible(false); // Make collider sprite invisible
            this.physics.add.collider(this.player, sprite);
        });

        this.physics.world.drawDebug = false;
    }

    createMail(mailObjects) {
        this.mail = this.physics.add.group();

        mailObjects.forEach(obj => {
            const mail = this.mail.create(obj.x - obj.width * 0.5, obj.y, "mail"); // Adjust x position
            mail.setOrigin(0.5, 1);
            mail.body.setAllowGravity(false);
            mail.setDepth(1); // Ensure mail is on top layer
        });

        this.physics.add.overlap(this.player, this.mail, this.collectMail, null, this);
    }

    collectMail(player, mail) {
        mail.destroy(); // Remove the collected mail from the scene
        this.mailCollected++;
        this.sound.play("mail_pickup");
        this.mailText.setText(`Mail collected: ${this.mailCollected}/10`);
    }

    update() {
        this.player.body.setVelocity(0);

        if (this.keys.W.isDown) {
            this.player.body.setVelocityY(-160);
            this.player.anims.play("walkFront", true);
        } else if (this.keys.S.isDown) {
            this.player.body.setVelocityY(160);
            this.player.anims.play("walkBack", true);
        } else if (this.keys.A.isDown) {
            this.player.body.setVelocityX(-160);
            this.player.anims.play("walkLeft", true);
        } else if (this.keys.D.isDown) {
            this.player.body.setVelocityX(160);
            this.player.anims.play("walkRight", true);
        } else {
            this.player.anims.stop();
        }
    }
}
