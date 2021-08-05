// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        // Load the dino sprite
        game.load.image('dino', 'assets/dino-idle.png'); 
        game.load.image('ground', 'assets/ground.png');
        game.load.image('cactus', 'assets/cactus.png');
    },
    
    create: function() { 

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" });   

        

        // Create an empty group for cactuses
        this.cactuses = game.add.group(); 

        // Change the background color of the game to Whitish
        game.stage.backgroundColor = '#F2F2F2';
    
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
    
        // Display the dino and the ground
        this.dino = game.add.sprite(100, 340, 'dino');
        game.physics.arcade.enable(this.dino);
        this.dino.enableBody = true;
        
        this.ground = this.add.tileSprite(0, 380, 800, 26, 'ground');
        this.ground.physicsType = Phaser.SPRITE;
        game.physics.arcade.enable(this.ground);
        this.ground.checkWorldBounds = true;
        this.ground.enableBody= true;
        this.ground.immovable= true;
        
        
        
        
        


        // Add physics to the dino
        game.physics.arcade.enable(this.dino);
    
        // Add gravity to the dino to make it fall.
        this.dino.body.gravity.y = 1000;                            
    
        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 
        
        this.timer = game.time.events.loop(1800, this.addRowOfcactuses, this); 
   
        // Move the anchor to the left and downward
        this.dino.anchor.setTo(-0.2, 0.5); 
    },
    
    update: function() {
      
        // Call the 'restartGame' function
        if (this.dino.y < 0 || this.dino.y > 490)
            this.restartGame();

        game.physics.arcade.overlap(
            this.dino, this.cactuses, this.hitcactus, null, this);
        
            game.physics.arcade.collide(this.dino, this.ground);    
    },

        // Make the dino jump 
    jump: function() {
        
        if (this.dino.alive == false)
            return;  

       
            this.dino.body.velocity.y = -600;
        // Add a vertical velocity to the dino
        

    },

    

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },

    addOnecactus: function(x, y) {
        // Create a cactus at the position x and y
        var cactus = game.add.sprite(x, y, 'cactus');
    
        // Add the cactus to our previously created group
        this.cactuses.add(cactus);
    
        // Enable physics on the cactus 
        game.physics.arcade.enable(cactus);
    
        // Add velocity to the cactus to make it move left
        cactus.body.velocity.x = -280; 
    
        // Automatically kill the cactus when it's no longer visible 
        cactus.checkWorldBounds = true;
        cactus.outOfBoundsKill = true;
    },


    //GOOD
    addRowOfcactuses: function() {
        // Randomly pick a number between 1 and 3
        // This will be the number of cactuses
        var numberOfBoxes = Math.floor(Math.random() * 3) + 1;  
    
        //Add cactuses to location
        for (var i = 0; i < numberOfBoxes; i++)
            this.addOnecactus(800, i * - 30 + 340);   
            this.score += 1;
            this.labelScore.text = this.score;
            
        
           
    },


    hitcactus: function() {
        // If the dino has already hit a cactus, do nothing
        // It means the dino is falling off the screen
        if (this.dino.alive == false)
            return;
    
        // Set the alive property of the dino to false
        this.dino.alive = false;
    
        // Prevent new obstacles from appearing
        game.time.events.remove(this.timer); 
    
        // Go through all the cactuses, and stop their movement
        this.cactuses.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    }, 

    // resetDino: function() {
    //     this.dino.x = 100;
    //     this.dino.y = 340;
    //     this.ground.x = 100;
    //     this.ground.y = 340;
    // }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(800, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');