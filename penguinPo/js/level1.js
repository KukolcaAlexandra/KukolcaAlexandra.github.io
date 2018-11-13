var level1 = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
}
 
level1.prototype = {

  	create: function(){
		//add music
		this.music = this.game.add.audio('music');
	    this.music.play();
	    
		this.game.stage.backgroundColor = '#71c5cf';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    
	    //  A simple background for our game
	  
	    this.back = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'back1');
	    this.back2 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'mid1');
	    this.back3 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'front1');
	  
	  	this.score = 0;
	  	var title1 = this.game.add.sprite(-165, -70, 'title1');
		title1.scale.setTo(1, 0.7);
	    this.scoreText = this.game.add.text(155, 80, '0', { fontSize: '46px', fill: '#589290'});

	    // sea   
	    this.sea = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('sea').height + 45, this.game.width,  this.game.cache.getImage('sea').height,'sea');
	      
	    //  The platforms group contains the ice we can jump on
	    platforms = this.game.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ice.
	    widthIce = [];
	    widthIce[0] = this.game.cache.getImage('ice1').width;
	    widthIce[1] = this.game.cache.getImage('ice2').width;
	    widthIce[2] = this.game.cache.getImage('ice3').width;

	    heightIce = [];
	    heightIce[0] = this.game.cache.getImage('ice1').height;
	    heightIce[1] = this.game.cache.getImage('ice2').height;
	    heightIce[2] = this.game.cache.getImage('ice3').height;
	   
	    this.ice = [];
	    var x = 0;
	    var interval = 200;
	    var str = ['ice1','ice2', 'ice3'];
	    var randIce;
	    this.count = 0
	    /*for(var i=0; i<20; i++){
	        //console.log('random = ' + randomInteger(0, 2));
	        //alert(randomInteger(0, 2));
	        randIce = randomInteger(0, 2);
	        this.ice[i] = platforms.create(x, game.world.height - heightIce[randIce], str[randIce]);
	        x += widthIce[randIce] + interval + randomInteger(0, 100);
	        
	        //this.ice[i].scale.setTo(0.5, 3);
	        if(i%4 === 0 && i !== 0)
	            this.ice[i].body.immovable = false;
	        else
	            this.ice[i].body.immovable = true;
	    }*/

	    // Create all platforms
	    var i = 0;
	    var j = 0;
	   
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 50;//randomInteger(0, 100);
	    this.ice[i++].body.immovable = true;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 28, str[j]);
	    x += widthIce[j] + interval + 80;
	    this.ice[i++].body.immovable = true;

	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 70;
	    this.ice[i++].body.immovable = true;

	    j = 0;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 40;
	    this.ice[i++].body.immovable = true;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    x += widthIce[j] + interval + 40;
	    this.ice[i++].body.immovable = false;

	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 30;
	    this.ice[i++].body.immovable = true;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 10, str[j]);
	    x += widthIce[j] + interval + 10;
	    this.ice[i++].body.immovable = true;
	    
	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    x += widthIce[j] + interval + 20;
	    this.ice[i].scale.setTo(2, 1);
	    this.ice[i++].body.immovable = false;

	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 50;
	    this.ice[i++].body.immovable = true;

	    //The end
	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j];
	    this.ice[i].scale.setTo(2, 1);
	    this.ice[i++].body.immovable = true;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    //x += widthIce[j];
	    this.ice[i].scale.setTo(2, 1);
	    this.ice[i++].body.immovable = true;

		this.distance = x;
		
	  	//create igloo
	    environment = this.game.add.group();
	    environment.enableBody = true;
	    this.igloo = environment.create(x+200, this.game.world.height - heightIce[j] + 40 - this.game.cache.getImage('igloo').height, 'igloo');
	    this.igloo.scale.setTo(1, 1);
	    this.igloo.body.immovable = true;
	    this.igloo.scale.setTo(1, 1);

			  
	    this.passed = 0
	   
	    // The player and its settings
	    
	    var startPos =  this.game.world.height - heightIce[0] + 40;
	    player = this.game.add.sprite(50, 0, 'pinguin');
	    player.scale.setTo(0.5, 0.5);

	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(player);
	    this.game.physics.arcade.enable(platforms);
	  
	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 400;
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2], 10, true);
	    player.animations.add('right', [0, 1, 2], 10, true);
	    player.animations.add('up', [6], 10, true);

	    /*shark = this.game.add.sprite(400, this.game.world.height-400, 'shark');
	    this.game.physics.arcade.enable(shark);
	    shark.body.bounce.y = 0.2;
	    shark.body.gravity.y = 1000;
	    shark.body.collideWorldBounds = true;
	    shark.animations.add('up', [0, 1], 10, true);
	    shark.animations.add('no', [2], 10, true);*/

	     
	    //Create the fishes
	    fishes = this.game.add.group();
	    fishes.enableBody = true;
	   
	    this.fish1 = [];
	  
	    for(i=0; i<10; i++){
	        this.fish1[i] = fishes.create(i*600+150, this.game.world.height-360, 'fish1');
	    }

	    this.fish2 = [];
	    for(i=0; i<9; i++){
	        this.fish2[i] = fishes.create(i*600+300, this.game.world.height-400, 'fish2');
	    }
	   
	    this.fish3 = [];
	    for(i=0; i<9; i++){
	        this.fish3[i] = fishes.create(i*600+450, this.game.world.height-380, 'fish3');
	    }

	    cursors = this.game.input.keyboard.createCursorKeys();
  
	},
	update: function(){
		//  Collide the player and the stars with the platforms
    	this.game.physics.arcade.collide(player, platforms);
    	this.game.physics.arcade.overlap(player, fishes, this.collectFish, null, this);
   		this.game.physics.arcade.overlap(player, environment, this.finished, null, this);
   		this.sea.tilePosition.x -= 3;
    
    	if(player.y > (this.game.world.height - 100)){
    		player.destroy();
    		this.restartGame();
    	}

    	player.body.velocity.x = 0;
    	//shark.body.velocity.x = 0;
    	//shark.body.velocity.y = -250;
    	
    	if (cursors.left.isDown)
    	{
    		if (cursors.up.isDown)
        	{
            	player.animations.play('up');
    	   	}else{
        		player.animations.play('left');
        	}
        	//  Move to the left
        	player.body.velocity.x = -150;
        	//shark.body.velocity.x = 150;
        	//shark.body.velocity.y = 300;
        	this.back.tilePosition.x += 1;
        	this.back2.tilePosition.x += 2;
        	this.back3.tilePosition.x += 3;
        	this.sea.tilePosition.x += 3;
        	this.ice.forEach(function(elem){
            	elem.body.x += 5;
        	});

        	this.fish1.forEach(function(elem){
            	elem.body.x += 5;
        	});
        	this.fish2.forEach(function(elem){
            	elem.body.x += 5;
        	});
       		this.fish3.forEach(function(elem){
            	elem.body.x += 5;
        	});
        	this.igloo.body.x += 5;
        
        	this.passed = this.ice[0].body.x;
            
    	}
    	else if (cursors.right.isDown)
    	{
        	//  Move to the right
        	if(player.body.x<200 || this.passed <= -5000){
            	player.body.velocity.x = 150;
            	player.animations.play('right');
            	//shark.body.velocity.x = -150;

        	}
        	else{
     
            	if (cursors.up.isDown)
        		{
            		
        	   		player.animations.play('up');
    	   		}else{
        	   		player.animations.play('right');
        	   		
            	}
            	//shark.body.velocity.x = -150;
            	//shark.body.velocity.y = -300;
            	        
	            this.back.tilePosition.x -= 1;
	            this.back2.tilePosition.x -= 2;
	            this.back3.tilePosition.x -= 3;
	            this.sea.tilePosition.x -= 3;
	            this.ice.forEach(function(elem){
	                elem.body.x -= 5;
	            });
	            this.fish1.forEach(function(elem){
	                elem.body.x -= 5;
	            });
	            this.fish2.forEach(function(elem){
	                elem.body.x -= 5;
	            });
	            this.fish3.forEach(function(elem){
	                elem.body.x -= 5;
	            });
	            this.igloo.body.x -= 5;
	            this.passed = this.ice[0].body.x;
	       	}
    	}
    	else
    	{
        	//  Stand still
        	player.animations.stop();
        	player.frame = 4;
    	}
    
    	//  Allow the player to jump if they are touching the ground.
    	if (cursors.up.isDown && player.body.touching.down)
    	{
        	player.body.velocity.y = -350;
        	player.animations.play('up');
    	}
	},
	// Restart the game
	restartGame: function() {
    	this.music.stop();
    	var end = this.game.add.sprite((this.game.world.width-this.game.cache.getImage('gameover').width)/2, 
    									(this.game.world.height-this.game.cache.getImage('gameover').height)/2-100, 'gameover');
    	var button = this.game.add.button(this.game.world.centerX-this.game.cache.getImage('tryagain').width/2,
    									  this.game.world.centerY-this.game.cache.getImage('tryagain').height/2+10, 'tryagain', this.actionOnClick, this, 1, 0, 2);
	},

	randomInteger: function(min, max) {
    	var rand = min - 0.5 + Math.random() * (max - min + 1)
    	rand = Math.round(rand);
    	return rand;
	},

	collectFish: function(player, fish) {
 	    fish.kill();
 	    this.score += 10;
    	this.scoreText.text = this.score;
	},

	actionOnClick: function(){
		this.music.stop();
		this.game.score = 0;
		this.game.state.start("Level1");
	},

	finished: function(){
		this.music.stop();
		this.game.score = this.score;
		this.game.state.start("Level2");
	}
	
}