var level2 = function(game){
	this.score = game.score;
	console.log("score in level2 = " + this.score);
}
 
level2.prototype = {
  	create: function(){
  		
	    //this.scoreText.text = 'Score: ' + this.score;

  		//this.scoreText;
  		//this.scoreText.text = 'Score: ' + this.score;

		this.music = this.game.add.audio('music');
	    this.music.play();
		this.game.stage.backgroundColor = '#71c5cf';
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//this.back = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'back');
		//this.cloud = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'cloud');
		this.back = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'back2');
	    //this.back2 = this.game.add.tileSprite(0, 100, this.game.width, this.game.height,'back2');
	    //this.back2 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'mid2');
	    //this.back3 = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'front2');
	    

	    this.score = this.game.score;
  		this.levelText = this.game.add.text(16, 16, 'Level 2', { fontSize: '32px', fill: '#000', color: '#232526' });
	    this.scoreText;
	    this.scoreText = this.game.add.text(16, 16+35, 'Score: ' + this.score, { fontSize: '32px', fill: '#000', color: '#232526' });
	    this.win = false;

	    // sea   
	    this.sea = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('sea').height + 70, this.game.width,  this.game.cache.getImage('sea').height,'sea');
  		
  		//this.pings = this.game.add.sprite(200, 500, 'pings');
	    //this.game.physics.arcade.enable(this.pings);

	    //this.finish = this.game.add.sprite(200, window.outerHeight - 320 - this.game.cache.getImage('finish').height, 'finish');
	    //this.game.physics.arcade.enable(this.finish);
	    //  The platforms group contains the ice we can jump on
	    //Create the seashells
	    seashells = this.game.add.group();
	    seashells.enableBody = true;
	    this.shells = [];
	   
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

	    var heightCube = this.game.cache.getImage('icecub').height;
	    var widthCube = this.game.cache.getImage('icecub').width;

	    var heightShell1 = this.game.cache.getImage('shell1').height;
	    var heightShell2 = this.game.cache.getImage('shell2').height;
	    var heightShell3 = this.game.cache.getImage('shell3').height;
	   	//console.log("height = " + heightShell);
	    this.ice = [];
	    this.cub = []; 
	    var x = 0;
	    //var widthIce = 0;
	    var interval = 200;
	    var str = ['ice1','ice2', 'ice3'];
	    var i = 0;
	    var j = 0;
	    //this.addPlatform(i++,0,x, 1, 1, true); 
	    console.log("heightIce = " + heightIce[j]);
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 50, str[j]);
	    this.ice[i++].body.immovable = true;

	    x += widthIce[j] + 100;
	    this.cub[0] = platforms.create(x, window.outerHeight - heightIce[j] - 150, 'icecub');
	    this.cub[0].body.immovable = true;
	    this.cub[0].scale.setTo(0.7, 0.7);
	    this.shells[0] = seashells.create(x+10, window.outerHeight - heightIce[j] - 150 - heightShell1, 'shell1');

	    x += widthCube + 100;
	    this.cub[1] = platforms.create(x, window.outerHeight - heightIce[j] - 250, 'icecub');
	    this.cub[1].body.immovable = true;
	    this.cub[1].scale.setTo(0.7, 0.7);
	    this.shells[1] = seashells.create(x+10, window.outerHeight - heightIce[j] - 250 - heightShell3, 'shell3');

	    x += widthCube + 100;
	    this.cub[2] = platforms.create(x, window.outerHeight - heightIce[j] - 250, 'icecub');
	    //this.cub[2].body.immovable = true;
	    this.cub[2].scale.setTo(0.7, 0.7);
	    this.shells[2] = seashells.create(x+10, window.outerHeight - heightIce[j] - 250 - heightShell2, 'shell2');


	    //x += widthIce[j] + interval + 350;//randomInteger(0, 100);
	    x += widthCube + 100;
	    
	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 50, str[j]);
	    this.ice[i++].body.immovable = true;
	    this.shells[3] = seashells.create(x+10, this.game.world.height - heightIce[j] + 50 - heightShell1, 'shell1');
	    x += widthIce[j] + interval + 100;

	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 70;
	    this.ice[i++].body.immovable = true;

	    j = 0;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 50, str[j]);
	    x += widthIce[j] + interval + 40;
	    this.ice[i++].body.immovable = true;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    this.ice[i++].body.immovable = false;
	    this.shells[4] = seashells.create(x+10, this.game.world.height - heightIce[j] - heightShell3, 'shell3');
	    x += widthIce[j] + interval + 40;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    this.ice[i++].body.immovable = false;
	    this.shells[5] = seashells.create(x+10, this.game.world.height - heightIce[j] - heightShell2, 'shell2');
	    x += widthIce[j] + interval + 40;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    this.ice[i++].body.immovable = true;
	    this.shells[6] = seashells.create(x+10, this.game.world.height - heightIce[j] - heightShell1, 'shell1');
	    x += widthIce[j] + interval + 40;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    this.ice[i++].body.immovable = false;
	    this.shells[7] = seashells.create(x+10, this.game.world.height - heightIce[j] - heightShell3, 'shell3');
	    x += widthIce[j] + interval + 40;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    this.ice[i++].body.immovable = false;
	    this.shells[8] = seashells.create(x+10, this.game.world.height - heightIce[j] - heightShell2, 'shell2');
	    x += widthIce[j] + interval + 40;

	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval + 30;
	    this.ice[i++].body.immovable = true;

	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 10, str[j]);
	    this.ice[i++].body.immovable = true;
	    this.shells[9] = seashells.create(x+20, this.game.world.height - heightIce[j] + 10 - heightShell1, 'shell1');
	    x += widthIce[j] + interval + 50;
	    
	    j = 1;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j], str[j]);
	    this.ice[i].scale.setTo(2, 1);
	    this.ice[i++].body.immovable = true;
	    this.shells[10] = seashells.create(x+60, this.game.world.height - heightIce[j] - heightShell2, 'shell2');
	    x += widthIce[j] + interval + 50;

	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j] + interval;
	    this.ice[i++].body.immovable = true;

	    this.cub[3] = platforms.create(x, window.outerHeight - heightIce[j] - 150, 'icecub');
	    this.cub[3].body.immovable = false;
	    this.cub[3].scale.setTo(0.7, 0.7);
	    this.shells[11] = seashells.create(x+10, window.outerHeight - heightIce[j] - 150 - heightShell3, 'shell3');

	    x += widthCube + 100;
	    this.cub[4] = platforms.create(x, window.outerHeight - heightIce[j] - 150, 'icecub');
	    this.cub[4].body.immovable = false;
	    this.cub[4].scale.setTo(0.7, 0.7);
	    this.shells[12] = seashells.create(x+10, window.outerHeight - heightIce[j] - 150 - heightShell2, 'shell2');

	    x += widthCube + 100;
	    this.cub[5] = platforms.create(x, window.outerHeight - heightIce[j] - 150, 'icecub');
	    this.cub[5].body.immovable = false;
	    this.cub[5].scale.setTo(0.7, 0.7);
	    this.shells[13] = seashells.create(x+10, window.outerHeight - heightIce[j] - 150 - heightShell1, 'shell1');

	    x += widthCube + 100;
	    this.cub[6] = platforms.create(x, window.outerHeight - heightIce[j] - 150, 'icecub');
	    this.cub[6].body.immovable = false;
	    this.cub[6].scale.setTo(0.7, 0.7);
	    this.shells[14] = seashells.create(x+10, window.outerHeight - heightIce[j] - 150 - heightShell3, 'shell3');

	    x += widthCube + 100;
	    this.cub[7] = platforms.create(x, window.outerHeight - heightIce[j] - 150, 'icecub');
	    this.cub[7].body.immovable = false;
	    this.cub[7].scale.setTo(0.7, 0.7);
	    this.shells[15] = seashells.create(x+10, window.outerHeight - heightIce[j] - 150 - heightShell2, 'shell2');

	    x += widthCube + 100;

	    //The end
	    j = 2;
	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    x += widthIce[j];
	    this.ice[i].scale.setTo(2, 1);
	    this.ice[i++].body.immovable = true;
	    this.shells[16] = seashells.create(x+10, window.outerHeight - heightIce[j] + 40 - heightShell1, 'shell1');

	    this.ice[i] = platforms.create(x, this.game.world.height - heightIce[j] + 40, str[j]);
	    //x += widthIce[j];
	    this.ice[i].scale.setTo(2, 1);
	    this.ice[i++].body.immovable = true;
	    this.shells[17] = seashells.create(x+10, window.outerHeight - heightIce[j] + 40 - heightShell3, 'shell3');

	    this.distance = x;
	    this.passed = 0;

	    environment = this.game.add.group();
	    environment.enableBody = true;
	    //this.igloo = environment.create(x+200, this.game.world.height - heightIce[j] + 40 - this.game.cache.getImage('igloo').height, 'igloo');
	    this.flag = environment.create(8900, this.game.world.height - heightIce[j] + 100 - this.game.cache.getImage('flag').height, 'flag');
	    //x += widthIce[j];
	    this.flag.scale.setTo(0.7, 0.7);
	    this.flag.body.immovable = true;
	   
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
	    player.body.gravity.y = 400;
	   
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2], 10, true);
	    player.animations.add('right', [0, 1, 2], 10, true);
	    player.animations.add('up', [6], 10, true);


	    //mountains.animations.add('right',[0],10,true);
	    //  Our controls.
	    cursors = this.game.input.keyboard.createCursorKeys();
	},
	update: function(){
		//  Collide the player and the stars with the platforms
    	this.game.physics.arcade.collide(player, platforms);
    	//game.physics.arcade.collide(player, this.sea);
   		this.game.physics.arcade.overlap(player, seashells, this.collectShells, null, this);
   		this.game.physics.arcade.overlap(player, this.flag, this.finished, null, this);
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
        	//this.back2.tilePosition.x += 2;
        	//this.back3.tilePosition.x += 3;
        	//this.cloud.tilePosition.x += 1.5;
        	//this.water.tilePosition.x += 3;
        	this.sea.tilePosition.x += 3;
        	this.ice.forEach(function(elem){
            	elem.body.x += 5;
        	});
        	this.cub.forEach(function(elem){
            	elem.body.x += 5;
        	});
        	this.shells.forEach(function(elem){
            	elem.body.x += 5;
        	});
        	this.flag.body.x += 5;
        	//fishes1.position.x += 5;

        	this.passed = this.ice[0].body.x;
        	//this.pings.body.velocity.x = 150;
        	//this.finish.body.velocity.x = 150;
        
    	}
    	else if (cursors.right.isDown)
    	{
        	//  Move to the right
        	if(player.body.x<200 || this.passed <= -8000){
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
	            //this.back2.tilePosition.x -= 2;
	            //this.back3.tilePosition.x -= 3;
	            //this.cloud.tilePosition.x -= 1.5;

	            //this.water.tilePosition.x -= 3;
	            this.sea.tilePosition.x -= 3;
	            this.ice.forEach(function(elem){
	                elem.body.x -= 5;
	            });
	            this.cub.forEach(function(elem){
            		elem.body.x -= 5;
        		});
	            this.shells.forEach(function(elem){
	                elem.body.x -= 5;
	            });
	            this.flag.body.x -= 5;
	            this.passed = this.ice[0].body.x;

	            //this.pings.body.velocity.x = -150;
	            //this.finish.body.velocity.x = -150;
        
            
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
    	console.log("this.win = " + this.win);
    	if(this.win === false){
    		this.music.stop();
    		var end = this.game.add.sprite((this.game.world.width-this.game.cache.getImage('gameover').width)/2, 
    									(this.game.world.height-this.game.cache.getImage('gameover').height)/2-100, 'gameover');
    		//this.game.state.start("GameOver",true,false,this.score);
    		var button = this.game.add.button(this.game.world.centerX-this.game.cache.getImage('tryagain').width/2,
    									  this.game.world.centerY-this.game.cache.getImage('tryagain').height/2+10, 'tryagain', this.actionOnClick, this, 1, 0, 2);
    	}
	},

	collectShells: function(player, shell) {
 	    shell.kill();
    	this.score += 50;
    	this.scoreText.text = 'Score: ' + this.score;
	},

	actionOnClick: function(){
		//this.game.state.start('main');
		this.music.stop();
		this.game.state.start("Level1");
	},

	finished: function(){
		this.win = true;
		console.log("this.win set = " + this.win);
		var end = this.game.add.sprite((this.game.world.width-this.game.cache.getImage('winner').width)/2, 
    									(this.game.world.height-this.game.cache.getImage('winner').height)/2-100, 'winner');
    	//this.game.state.start("GameOver",true,false,this.score);
    	var button = this.game.add.button(this.game.world.centerX-this.game.cache.getImage('tryagain').width/2,
    									  this.game.world.centerY-this.game.cache.getImage('tryagain').height/2+250, 'tryagain', this.actionOnClick, this, 1, 0, 2);
		//this.game.state.start('main');
		//this.game.state.start("Level1");
		//alert("you win");
		//this.music.stop();
		//this.game.score = this.score;
		//this.game.state.start("Level2");
	}

}