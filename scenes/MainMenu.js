export class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
    }

    preload() {
        // Load images
        this.load.image("bg_image", "assets/png/Nightmare(cover).png");
        this.load.image("button_credits", "assets/png/sign_Credits.png");
        this.load.image("button_wakeUp", "assets/png/sign_WakeUp.png");
        this.load.image("button_exit", "assets/png/sign_ExitGame.png");
        this.load.image("button_settings", "assets/png/sign_Settings.png");

        // Load audio
        this.load.audio("menu_bgm", "assets/audio/Menu Music.wav");
        this.load.audio("button_click", "assets/audio/click on.wav");
    }

    create() {
        // Add background image
        this.add.image(0, 0, "bg_image").setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        // Background music
        if (!this.sound.get('menu_bgm')) {
            this.menuBgm = this.sound.add("menu_bgm", { loop: true, volume: 0.5 });
            this.menuBgm.play();
        } else {
            this.menuBgm = this.sound.get('menu_bgm');
        }

        this.buttonClick = this.sound.add("button_click", { volume: 0.5 });

        // Create buttons
        const buttonScale = 0.1; 
        const buttonY = this.cameras.main.height / 2 + 180; 
        const buttonSpacing = 105; 

        const wakeUpButton = this.add.image(this.cameras.main.centerX - 1.5 * buttonSpacing, buttonY, "button_wakeUp");
        const settingsButton = this.add.image(this.cameras.main.centerX - 0.5 * buttonSpacing, buttonY, "button_settings");
        const creditsButton = this.add.image(this.cameras.main.centerX + 0.5 * buttonSpacing, buttonY, "button_credits");
        const exitButton = this.add.image(this.cameras.main.centerX + 1.5 * buttonSpacing, buttonY, "button_exit");

        [wakeUpButton, settingsButton, creditsButton, exitButton].forEach(button => {
            button.setScale(buttonScale);
            button.setInteractive();

            // Button effects
            button.on('pointerover', () => {
                button.setTint(0x808080); 
            });

            button.on('pointerout', () => {
                button.clearTint();
            });

            button.on('pointerup', () => {
                this.buttonClick.play();
            });
        });

        // Wake Up button
        wakeUpButton.on('pointerup', () => {
            this.scene.start('GameScene');
            this.menuBgm.stop();
        });

        // Settings button
        settingsButton.on('pointerup', () => {
            this.scene.start('SettingsScene');
            this.buttonClick.play();
        });

        // Credits button
        creditsButton.on('pointerup', () => {
            this.scene.start('CreditsScene');
            this.buttonClick.play();
        });

        // Exit button
        exitButton.on('pointerup', () => {
            window.close(); 
        });
    }
}
