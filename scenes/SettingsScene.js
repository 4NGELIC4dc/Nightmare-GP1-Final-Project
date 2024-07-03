export class CreditsScene extends Phaser.Scene {
    constructor() {
        super("CreditsScene");
    }

    preload() {
        // Load images
        this.load.image("bg_image", "assets/png/Nightmare(cover).png");
        this.load.image("button_back", "assets/png/sign_Back.png");

        // Load audio
        this.load.audio("button_click", "assets/audio/click on.wav");
    }

    create() {
        const background = this.add.image(0, 0, "bg_image").setOrigin(0, 0).setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        background.setTint(0x808080); 

        // Button click sound
        this.buttonClick = this.sound.add("button_click", { volume: 0.5 });

        // Back button
        const buttonScale = 0.10; 
        const exitButton = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 50, "button_back");
        exitButton.setScale(buttonScale);
        exitButton.setInteractive();

        exitButton.on('pointerover', () => {
            exitButton.setTint(0x808080); 
        });

        exitButton.on('pointerout', () => {
            exitButton.clearTint();
        });

        exitButton.on('pointerup', () => {
            this.buttonClick.play();
            this.scene.start('MainMenu'); 
        });
    }
}
