// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        game.load.image('ground', 'assets/ground.png')
        game.load.image('dino', 'assets/dino.png'); 
     },
    
    create: function() { 
        const height = 600;
        const width = 800;

        // Change the background color of the game to blue
        game.stage.backgroundColor = '#808080';

        this.gameSpeed = 10;

        this.ground = this.add.tileSprite(0, height, width, 26, 'ground');
        this.dino = game.add.sprite(0, height, 'dino');
    
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
    
        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.dino);
    
        // Add gravity to the bird to make it fall
        this.dino.body.gravity.y = 1000;  
    
        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);     

    },
    
    update: function() {
        this.ground.tilePositionX += this.gameSpeed;
     },

    jump: function() { },
    
    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    } 
};

// Initialize Phaser, and create a 600px by 600px game
var game = new Phaser.Game(800, 600);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');