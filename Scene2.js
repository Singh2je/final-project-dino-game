class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {

        this.score = 0;
        this.labelScore = this.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#000000" });   

        
        this.cactuses = this.physics.add.group(); 
    
      
        this.dino = this.physics.add.sprite(100, 340, 'dino');
        this.dino.setGravityY(1500)            
        this.dino.setCollideWorldBounds(true)

        this.ground = this.physics.add.staticImage(0, 400, 'ground');
        this.physics.add.collider(this.dino, this.ground);
        this.physics.add.collider(this.dino, this.cactuses, this.hitcactus, null, this);

       // this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
     
       this.cursors = this.input.keyboard.createCursorKeys();

        this.time.addEvent({
            delay: 1500,
            callback: this.addRowOfcactuses,
            callbackScope: this,
            loop: true
        });
        
        
    }


    update() {
       
        this.ground.tilePositionX += 3;

        
        if (this.cursors.up.isDown && this.dino.body.touching.down)
        {
            this.dino.setVelocityY(-720);
        }

        // if(Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //     this.jump()
        // }
        
        this.physics.add.collider(this.dino, this.cactuses, this.hitcactus, null, this);
    }

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

       // cactus.setCollideWorldBounds(true);

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