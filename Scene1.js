class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {

        this.load.image('dino', 'assets/dino-idle.png'); 
        this.load.image('ground', 'assets/ground.png')
        this.load.image('cactus', 'assets/cactus.png');

        this.load.spritesheet('dino-run', 
        'assets/dino-run.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    }

    create() {
        this.scene.start("playGame");

        // this.anims.create({
        //     key: "ship1_anim",
        //     frames: this.anims.generateFrameNumbers("ship"),
        //     frameRate: 20,
        //     repeat: -1
        // });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dino-run', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
    }
}