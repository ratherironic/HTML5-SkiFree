var GM = GM || {};

GM.jump = function(){
	
	var img = new Image(),
			move = 'fwd',
			speed = 10,
			x = 0,
			y = 0,
			rotation = 0,
			width = 45,
			height = 10,
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

				ctx.fillStyle = "rgb(164,14,56)";
				ctx.fillRect(x, y, width, height);
			}
		},
		setMove:function(state){
			move=state;
		},
		setStart:function(xPos, yPos){
			x = xPos;
			y = yPos;
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




		
