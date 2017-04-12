var level1 = function(game){
	spriteNumber = null;
	number = 0;
	workingButtons = true;
	higher = true;
	score = 0;
}
 
level1.prototype = {

  	create: function(){
		//console.log("Hello from create");
		//console.log('window.outerHeight ' + window.outerHeight);
		//console.log('window.height ' + window.height);
		//console.log('this.game.world.height ' + this.game.world.height);
		 //game.add.sprite(200, 250, 'star');
		//console.log('window.outerWidth ' + window.outerWidth);
		//console.log('window.height ' + window.height);
		//console.log('this.game.world.width ' + this.game.world.width);
		 //game.add.sprite(200, 250, 'star');

	    this.music = this.game.add.audio('music');
	    this.music.play();
	    //this.bulb = this.game.add.audio('bulb');

		this.game.stage.backgroundColor = '#71c5cf';

	    //  We're going to be using physics, so enable the Arcade Physics system
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    
	    //  A simple background for our game
	  
	    //this.back = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'back');
	    //this.back2 = this.game.add.tileSprite(0, 100, this.game.width, this.game.height,'back2');
	    //this.back3 = this.game.add.tileSprite(0, 400, this.game.width, this.game.height,'back3');

	    this.back = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'back1');
	    this.back2 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'mid1');
	    this.back3 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'front1');
	  
	  	this.score = 0;
	    this.levelText = this.game.add.text(16, 16, 'Level 1', { fontSize: '32px', fill: '#000', color: '#232526' });
	    this.scoreText;
	    this.scoreText = this.game.add.text(16, 16 + 35, 'Score: 0', { fontSize: '32px', fill: '#000', color: '#232526' });

	    // sea   
	    this.sea = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('sea').height + 70, this.game.width,  this.game.cache.getImage('sea').height,'sea');
	  
	    //this.pings = game.add.tileSprite(2000, 400, game.cache.getImage('pings').width, game.cache.getImage('pings').height,'pings');
	    //this.pings = this.game.add.sprite(2000, this.game.world.height - this.game.cache.getImage('pings').height - 200, 'pings');
	    //this.game.physics.arcade.enable(this.pings);

	    
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
	    //var widthIce = 0;
	    var interval = 200;
	    var str = ['ice1','ice2', 'ice3'];
	    //var timeImmovable = randomInteger(3,5);
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
	    //this.addPlatform(i++,0,x, 1, 1, true); 
	    //console.log("heightIce = " + heightIce[j]);
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 50;//randomInteger(0, 100);
	    this.ice[i++].body.immovable = true;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 35, str[j]);
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
		console.log('x = ' + x);
	    //this.finish = this.game.add.sprite(x, this.game.world.height - heightIce[j] - 40 - this.game.cache.getImage('finish').height, 'finish');
	    //this.game.physics.arcade.enable(this.finish);

	    environment = this.game.add.group();
	    environment.enableBody = true;
	    //this.igloo = environment.create(x+200, this.game.world.height - heightIce[j] + 40 - this.game.cache.getImage('igloo').height, 'igloo');
	    this.igloo = environment.create(x+200, this.game.world.height - heightIce[j] + 40 - this.game.cache.getImage('igloo').height, 'igloo');
	    //x += widthIce[j];
	    this.igloo.scale.setTo(1, 1);
	    this.igloo.body.immovable = true;


	    //this.distance = x;
	    this.passed = 0
	   
	    // The player and its settings
	    //player = game.add.sprite(32, game.world.height - 150, 'pinguin');
	    //var startPos = this.game.cache.getImage('ice1').height;
	    var startPos = 260;//window.outerHeight - heightIce[j];
	    player = this.game.add.sprite(50, 0, 'pinguin');
	    player.scale.setTo(0.5, 0.5);
	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(player);
	    this.game.physics.arcade.enable(platforms);
	    //game.physics.arcade.enable(this.sea);
	    //game.physics.arcade.enable(mountains);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	   
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2], 10, true);
	    player.animations.add('right', [0, 1, 2], 10, true);
	    player.animations.add('up', [6], 10, true);


	    //Create the fishes
	    fishes = this.game.add.group();
	    fishes.enableBody = true;
	   
	    this.fish1 = [];
	    console.log("startPos = " + startPos);
	    console.log("this.game.height = " + this.game.height);
	    //startPos = this.game.world.height - heightIce[j];
	    //startPos = window.outerHeight - heightIce[j];
	    console.log("startPos = " + startPos);
	    for(i=0; i<10; i++){
	        this.fish1[i] = fishes.create(i*600+150, this.game.world.height-360, 'fish1');
	    }

	    //fishes2 = game.add.group();
	    //fishes2.enableBody = true;
	    this.fish2 = [];
	    for(i=0; i<10; i++){
	        this.fish2[i] = fishes.create(i*600+300, this.game.world.height-400, 'fish2');
	    }

	    //fishes3 = game.add.group();
	    //fishes3.enableBody = true;
	    this.fish3 = [];
	    for(i=0; i<9; i++){
	        this.fish3[i] = fishes.create(i*600+450, this.game.world.height-380, 'fish3');
	    }





	    //mountains.animations.add('right',[0],10,true);
	    //  Our controls.
	    cursors = this.game.input.keyboard.createCursorKeys();
  
	},
	update: function(){
		//  Collide the player and the stars with the platforms
    	this.game.physics.arcade.collide(player, platforms);
    	//game.physics.arcade.collide(player, this.sea);
   		this.game.physics.arcade.overlap(player, fishes, this.collectFish, null, this);
   		//this.game.physics.arcade.overlap(player, this.finish, this.finished, null, this);
   		this.game.physics.arcade.overlap(player, environment, this.finished, null, this);
    	//console.log('this.passed =  = ' + this.passed);
    	//console.log('player.y =  ' + player.y);
    	this.sea.tilePosition.x -= 3;
    
    	//platforms.body.velocity.x = 150;
    	if(player.y > (this.game.world.height - 100)){
    		//alert("game over");
    		player.destroy();
    		this.restartGame();
    	}

    	if(this.passed <= -1000){
        	//this.pings = game.add.tileSprite(0, 400, game.cache.getImage('pings').width, game.cache.getImage('pings').height,'pings');
        	//alert("you win");
    	}
    	//console.log("y = " + player.y);
    	//  Reset the players velocity (movement)
    	player.body.velocity.x = 0;
    	//this.pings.body.velocity.x = 0;
    	//this.finish.body.velocity.x = 0;

    	if (cursors.left.isDown)
    	{
        	//  Move to the left
        	player.body.velocity.x = -150;
        	player.animations.play('left');
        	this.back.tilePosition.x += 1;
        	this.back2.tilePosition.x += 2;
        	this.back3.tilePosition.x += 3;
        	//this.water.tilePosition.x += 3;
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
        
        	//fishes1.position.x += 5;

        	this.passed = this.ice[0].body.x;
        	//this.pings.body.velocity.x = 150;
        	//this.finish.body.velocity.x = 150;
        	//this.finish.x += 1;
        
    	}
    	else if (cursors.right.isDown)
    	{
        	//  Move to the right
        	if(player.body.x<200 || this.passed <= -5000){
            	//alert("x < 200");
            	player.body.velocity.x = 150;
            	//this.finish.body.velocity.x = 0;
            	player.animations.play('right');

        	}
        	else{
     
            	if (cursors.up.isDown)
        		{
            		//player.body.velocity.y = -350;
        	   		player.animations.play('up');
    	   		}else{
        	   		player.animations.play('right');
            	}
            	//this.sea.tilePosition.x -= 5; 
            	//this.moun.tilePosition.x -= 2.5;
        
	            this.back.tilePosition.x -= 1;
	            this.back2.tilePosition.x -= 2;
	            this.back3.tilePosition.x -= 3;

	            //this.water.tilePosition.x -= 3;
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

	            //this.pings.body.velocity.x = -150;
	            //this.finish.body.velocity.x = -150;
	            //this.finish.x -= 1;
        
            
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
    	// Start the 'main' state, which restarts the game
    	//game.state.start('main');
    	this.music.stop();
    	//this.bulb.play();
    	var end = this.game.add.sprite((this.game.world.width-this.game.cache.getImage('gameover').width)/2, 
    									(this.game.world.height-this.game.cache.getImage('gameover').height)/2-100, 'gameover');
    	//this.game.state.start("GameOver",true,false,this.score);
    	var button = this.game.add.button(this.game.world.centerX-this.game.cache.getImage('tryagain').width/2,
    									  this.game.world.centerY-this.game.cache.getImage('tryagain').height/2+10, 'tryagain', this.actionOnClick, this, 1, 0, 2);
	},

	randomInteger: function(min, max) {
    	var rand = min - 0.5 + Math.random() * (max - min + 1)
    	rand = Math.round(rand);
    	return rand;
	},

	killPlayer: function() {
    	//alert("kill player game over");
    	console.log("kill");
	},

	collectFish: function(player, fish) {
 	    fish.kill();
 	    this.score += 10;
    	this.scoreText.text = 'Score: ' + this.score;
	},

	/*addPlatform: function(i, j, x, interval, scaleX, scaleY, flag){
		this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    //x += widthIce[j] + interval;//randomInteger(0, 100);
	    this.ice[i].body.immovable = flag;
	}*/

	actionOnClick: function(){
		//this.game.state.start('main');
		this.music.stop();
		this.game.score = 0;
		this.game.state.start("Level1");
	},

	finished: function(){
		//this.game.state.start('main');
		//this.game.state.start("Level1");
		//alert("you win");
		this.music.stop();
		this.game.score = this.score;
		this.game.state.start("Level2");
	}
}