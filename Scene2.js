class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        // this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        // this.background.setOrigin(0, 0);

        // this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2, "ship");
        // this.ship2 = this.add.sprite(config.width/2, config.height/2, "ship2");
        // this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, "ship3");

        // this.enemies = this.physics.add.group();
        // this.enemies.add(this.ship1);
        // this.enemies.add(this.ship2);
        // this.enemies.add(this.ship3);

        // this.player = this.physics.add.sprite(config.width/2 - 8, config.height - 64, "player");
        // this.player.play("thrust");
        // this.cursorKeys = this.input.keyboard.createCursorKeys();
        // this.player.setCollideWorldBounds(true);

        // this.powerUps = this.physics.add.group();

        // var maxObjects = 4;
        // for(var i = 0; i <= maxObjects; i++) {
        //     var powerUp = this.physics.add.sprite(16, 16, "power-up");
        //     this.powerUps.add(powerUp);
        //     powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

        //     if(Math.random() > 0.5) {
        //         powerUp.play("red");
        //     } else {
        //         powerUp.play("gray");
        //     }

        //     powerUp.setVelocity(100, 100);
        //     powerUp.setCollideWorldBounds(true);
        //     powerUp.setBounce(1);
        // }

        // this.ship1.play("ship1_anim");
        // this.ship2.play("ship2_anim");
        // this.ship3.play("ship3_anim");

        // this.ship1.setInteractive();
        // this.ship2.setInteractive();
        // this.ship3.setInteractive();

        // this.input.on("gameobjectdown", this.destroyShip, this);

        // this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // this.projectiles = this.add.group();

        // this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
        //     projectile.destroy();
        // });

        // this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        // this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        // this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        // var graphics = this.add.graphics();
        // graphics.fillStyle(0x000000, 1);
        // graphics.beginPath();
        // graphics.moveTo(0, 0);
        // graphics.lineTo(config.width, 0);
        // graphics.lineTo(config.width, 20);
        // graphics.lineTo(0, 20);
        // graphics.lineTo(0, 0);
        // graphics.closePath();
        // graphics.fillPath();

        // this.score = 0;

        // this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
        //----------------------------------------------------------

        this.score = 0;
        this.labelScore = this.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" });   

        

        // Create an empty group for cactuses
        this.cactuses = this.physics.add.group(); 
    
        // Display the dino at the position x=100 and y=350
        this.dino = this.physics.add.sprite(100, 350, 'dino').setOrigin(-0.2, 0.5);
        this.dino.setCollideWorldBounds(true);

        this.ground = this.add.tileSprite(0, 485, 0, 26, 'ground');
        this.ground.checkWorldBounds = true;
        this.ground.enableBody= true;
        this.ground.immovable= true;

        // Add gravity to the dino to make it fall.
        this.dino.setGravityY(1000)            
    
        // Call the 'jump' function when the spacekey is hit
        // var spaceKey = game.input.keyboard.addKey(
        //                 Phaser.Keyboard.SPACEBAR);
        // spaceKey.onDown.add(this.jump, this); 

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
       

        this.time.addEvent({
            delay: 1800,
            callback: this.addRowOfcactuses,
            callbackScope: this,
            loop: true
        });
    }

    // hurtPlayer(player, enemy) {
    //     this.resetShipPos(enemy);

    //     if(this.player.alpha < 1) {
    //         return;
    //     }

    //     var explosion = new Explosion(this, player.x, player.y);
    //     player.disableBody(true, true);
    //     this.time.addEvent({
    //         delay: 1000,
    //         callback: this.resetPlayer,
    //         callbackScope: this,
    //         loop: false
    //     });
    // }

    // resetPlayer() {
    //     var x = config.width / 2 -8;
    //     var y = config.height + 64;
    //     this.player.enableBody(true, x, y, true, true);
    //     this.player.alpha = 0.5;

    //     var tween = this.tweens.add({
    //         targets: this.player,
    //         y: config.height - 64,
    //         ease: 'Power1',
    //         duration: 1500,
    //         repeat:0,
    //         onComplete: function(){
    //           this.player.alpha = 1;
    //         },
    //         callbackScope: this
    //       });
    // }

    // hitEnemy(projectile, enemy) {
    //     var explosion = new Explosion(this, enemy.x, enemy.y);

    //     this.score += 15;
    //     var scoreFormated = this.zeroPad(this.score, 6);
    //     this.scoreLabel.text = "SCORE " + scoreFormated;

    //     projectile.destroy();
    //     this.resetShipPos(enemy);
    // }

    // zeroPad(number, size){
    //     var stringNumber = String(number);
    //     while(stringNumber.length < (size || 2)){
    //       stringNumber = "0" + stringNumber;
    //     }
    //     return stringNumber;
    // }

    // moveShip(ship, speed) {
    //     ship.y += speed;
    //     if(ship.y > config.height) {
    //         this.resetShipPos(ship);
    //     }
    // }

    update() {
        var hitPlatform = this.physics.add.overlap(this.dino, this.ground);
        // this.moveShip(this.ship1, 1);
        // this.moveShip(this.ship2, 2);
        // this.moveShip(this.ship3, 3);

        this.ground.tilePositionX += 3;

        // this.movePlayerManager();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar) && this.dino.body.touching.down && hitPlatform) {
            this.jump()
        }
    //     if (this.spacebar.up.isDown && dino.body.touching.down && hitPlatform)
    // {
    //     dino.body.velocity.y = -350;
    // }
        
        // for(var i = 0; i < this.projectiles.getChildren().length; i++){
        //     var beam = this.projectiles.getChildren()[i];
        //     beam.update();
        // }
        // if (this.dino.y < 0 || this.dino.y > 490)
        //     this.restartGame();

        this.physics.add.overlap(
            this.dino, this.cactuses, this.hitcactus, null, this);

    }

    // movePlayerManager() {
    //     if(this.cursorKeys.left.isDown) {
    //         this.player.setVelocityX(-gameSettings.playerSpeed);
    //     }
    //     else if(this.cursorKeys.right.isDown) {
    //         this.player.setVelocityX(gameSettings.playerSpeed);
    //     }

    //     if(this.cursorKeys.up.isDown) {
    //         this.player.setVelocityY(-gameSettings.playerSpeed);
    //     }
    //     else if(this.cursorKeys.down.isDown) {
    //         this.player.setVelocityY(gameSettings.playerSpeed);
    //     }
    // }

    // resetShipPos(ship) {
    //     ship.y = 0;
    //     var randomX = Phaser.Math.Between(0, config.width);
    //     ship.x = randomX;
    // }

    addOneCactus(x, y) {
        var cactus = this.physics.add.sprite(x, y, 'cactus');
    
        // Add the cactus to our previously created group
        this.cactuses.add(cactus);
    
        // Enable physics on the cactus 
        // this.physics.arcade.enable(cactus);
    
        // Add velocity to the cactus to make it move left
        cactus.setVelocityX(-280); 
    
        // Automatically kill the cactus when it's no longer visible 
        // cactus.checkWorldBounds = true;
        // cactus.outOfBoundsKill = true;

        cactus.setCollideWorldBounds(true);

        // Turning this on will allow you to listen to the 'worldbounds' event
        cactus.body.onWorldBounds = true;

        // 'worldbounds' event listener
        cactus.body.world.on('worldbounds', function(body) {
        // Check if the body's game object is the sprite you are listening for
            if (body.gameObject === this) {
                // Stop physics and render updates for this object
                this.setActive(false);
                this.setVisible(false);
            }
        }, cactus);
    }

    addRowOfcactuses() {
        var numberOfBoxes = Math.floor(Math.random() * 3) + 1;  
    
        //Add cactuses to location
        for (var i = 0; i < numberOfBoxes; i++)
            this.addOneCactus(800, i * - 30 + 340);   
            this.score += 1;
            this.labelScore.text = this.score;
    }

    jump() {
        if (this.dino.alive == false)
            return;  

       
        this.dino.setVelocityY(-600);
    }
}