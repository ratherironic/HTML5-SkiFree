var GM = GM || {};

GM.enemy = function(){
	
	var img = new Image(),
			speed = 10,
			move = 'fwd',
			x = 0,
			y = 0,
			rotation = 0,
			width = 20,
			height = 20,
			sprite = '',
			ang = 30,
			pi = Math.PI;
			
	var pub = {
		moveRight: function() {
			x+=Math.round(Math.cos(rotation * pi/180)*speed);
		},
		moveLeft: function() {
			x-=Math.round(Math.cos(rotation * pi/180)*speed);
		},
		fwd:function(){
			if(move == 'fwd'){
				var changePos = {
					x: Math.round(Math.cos(rotation * pi/180)*3),
					y: Math.round(speed * Math.cos(rotation * pi/180))
				}
				x = x;
				y = y - changePos.y;
				//ctx.fillStyle = "rgb(157,157,87)";
				//ctx.fillRect(x, y, width, height);
				img.src = 'assets/scproinc-r2.png';
				ctx.drawImage(img, x, y);
			}
		},
		setStart:function(xPos, yPos){
			x = xPos;
			y = yPos;
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
		}
	};
	return pub;
};




		
