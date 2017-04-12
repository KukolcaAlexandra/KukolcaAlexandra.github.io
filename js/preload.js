var preload = function(game){}
 
preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(this.game.width/2,this.game.height/2,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
        console.log('i am at preload');

        this.game.load.image('ice1', 'assets/ice3.jpg');
    	this.game.load.image('ice2', 'assets/ice2.jpg');
    	this.game.load.image('ice3', 'assets/ice4.jpg');
        this.game.load.image('icecub', 'assets/icecub.jpg');

    	this.game.load.image('fish1', 'assets/fish1.png');
    	this.game.load.image('fish2', 'assets/fish2.png');
    	this.game.load.image('fish3', 'assets/fish3.png');

        this.game.load.image('shell1', 'assets/shell.png');
        this.game.load.image('shell2', 'assets/shell2.png');
        this.game.load.image('shell3', 'assets/star.png');
	
    	//this.game.load.image('back', 'assets/back.png');
   		//this.game.load.image('back2', 'assets/mountains-mid1.png');
    	//this.game.load.image('back3', 'assets/mountains-mid2.png');

        this.game.load.image('front1', 'assets/front.png');
        this.game.load.image('mid1', 'assets/mid.png');
        this.game.load.image('back1', 'assets/backLev1.png');

        //this.game.load.image('front2', 'assets/front.png');
        //this.game.load.image('mid2', 'assets/mid.png');
        this.game.load.image('back2', 'assets/back2.png');

    	this.game.load.image('sea', 'assets/sea1.png');
        //this.game.load.image('cloud', 'assets/cloud1.png');
    	  
		this.game.load.spritesheet('pinguin', 'assets/ping.png', 110, 114);
    	this.game.load.audio('music', 'assets/audio/fon-music.mp3');
        
        this.game.load.image('logo', 'assets/logo2.png');
        this.game.load.image('go', 'assets/play.png');
    	this.game.load.image("gameover","assets/gameover.png");
        this.game.load.image("tryagain","assets/tryagain.png");
        this.game.load.image("igloo","assets/igloo.png");
		this.game.load.image("flag","assets/flag.png");
        this.game.load.image("winner","assets/winner.png");
		
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}