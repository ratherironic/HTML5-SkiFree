var GM = GM || {};

GM.player = function(){
	var img = new Image(),
			speed = 5,
			x = ($('#GameField').width() / 2),
			y = ($('#GameField').height() / 2),
			width = 20,
			height = 20,
			rotation = 0,
			ang = 15,
			pi = Math.PI,
			move='fwd';
			
	var pub = {
		moveRight: function() {
			//we will only be rotating the user's sprite, not actually changing the users position
			move = 'right';
		},
		moveLeft: function() {
			move = 'left';	
		},
		moveFwd: function(){
			move = 'fwd';
		},
		jumpUp:function(){
			move ='up';
		},
		jumpDown:function(){
			move ='down';
		},
		fwd:function(){
			if(move == 'right'){
				//switch view to right
				//ctx.fillStyle = "rgb(248,236,194)";
				//ctx.fillRect(x, y, width, height);
				img.src = 'assets/player_down.png';
				ctx.drawImage(img, x, y);
			}else if(move == 'left'){
				//switch view to left
				//ctx.fillStyle = "rgb(248,236,194)";
				//ctx.fillRect(x, y, width, height);
				img.src = 'assets/player_down.png';
				ctx.drawImage(img, x, y);
			}else if(move=='up'){
				var changePos = {
					x: Math.round(Math.cos(rotation * pi/180)*3),
					y: Math.round(speed * Math.cos(rotation * pi/180))
				}
				x = x;
				y = y - changePos.y;
				if(y<10){
					player.jumpDown();
				}
				//ctx.fillStyle = "rgb(248,236,194)";
				//ctx.fillRect(x, y, width, height);
				img.src = 'assets/player_jump.png';
				ctx.drawImage(img, x, y);
			}else if(move=='down'){
					var changePos = {
						x: Math.round(Math.cos(rotation * pi/180)*3),
						y: Math.round(speed * Math.cos(rotation * pi/180))
					}
					x = x;
					y = y + changePos.y;
					if(y==($('#GameField').height() / 2)){
						player.moveFwd();
					}
					//ctx.fillStyle = "rgb(248,236,194)";
					//ctx.fillRect(x, y, width, height);
					img.src = 'assets/player_jump.png';
					ctx.drawImage(img, x, y);
				} else if(move == 'stop'){
					//Do nothing I guess...
					img.src = 'assets/player_dead.png';
					ctx.drawImage(img, x, y);
				}else{
				//ctx.fillStyle = "rgb(248,236,194)";
				//ctx.fillRect(x, y, width, height);
				img.src = 'assets/player_down.png';
				ctx.drawImage(img, x, y);
			}
		},
		setMove:function(state){
			move=state;
		},
		getX:function(){
			return x;
		},
		getY:function(){
			return y;
		},
		getBox:function(){
			return box = {h:height,w:width};
		},
		getRotation:function(){
			return rotation;
		},
		getMove:function(){
			return move;
		}
	};
	return pub;
};




		
	