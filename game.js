var gameSettings = {
    playerSpeed: 200
}

var config = {
    width: 800,
    height: 490,
    backgroundColor: `#F2F2F2`,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
}

var game = new Phaser.Game(config);