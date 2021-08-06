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
        { frameWidth: 88, frameHeight: 94 }
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
            key: 'dino-run',
            frames: this.anims.generateFrameNumbers('dino-run', {start: 2, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        
    }
}