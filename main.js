// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { },
    
    create: function() { 
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#000000';
    
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    update: function() { },

    jump: function() { },
    
    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    } 
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(600, 600);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');