var gameTitle = function(game){}
 
gameTitle.prototype = {
  	create: function(){
  		
		var gameTitle = this.game.add.sprite(this.game.world.width/2,
											 this.game.world.height/2,
											  "logo");
		gameTitle.anchor.setTo(0.5,0.5);

		var playButton = this.game.add.button(this.game.world.width/2 + 100,
											  this.game.world.height/2 + 100,
											  "go",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		
		this.game.state.start("Level1");
	}
}