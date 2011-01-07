var GM = GM || {};

var player,
		enemy,
		gravity = 10,
		velocity = 5,
		FPS = 30,
		boxE,
		boxU,
		maxNumEnemies = 10,
		jump,
		jumps = [],
		maxNumJumps = 3,
		gameWidth = $('#GameField').width(),
		gameHeight = $('#GameField').height(),
		enemies = [],
		draw = true,
		pi = Math.PI,
		timerEnemy,
		timerJump;

GM.manager = function(){
			
	var pub = {
		pageLoad: function(){
			pub.gametimer();
			pub.getInput();
			player = new GM.player();
			
			//generate enemies
			for(var i=0; i<maxNumEnemies;i++){
				enemies[i] = new GM.enemy();
				enemies[i].setStart(Math.floor(Math.random() * gameWidth) , Math.floor(Math.random(gameHeight)));
			}
			pub.generateEnemy();
			
			for(var i=0; i<maxNumJumps;i++){
				jumps[i] = new GM.jump();
				jumps[i].setStart(Math.floor(Math.random() * gameWidth) , Math.floor(Math.random(gameHeight)));
			}
			pub.generateJumps();
		},
		getInput: function(){
			$(document).keypress(function(event) {
				if (event.keyCode == '37') {
					for(var i=0; i<enemies.length;i++){
						enemies[i].moveRight();
					}
					for(var i=0; i<jumps.length;i++){
						jumps[i].moveRight();
					}
				}else if(event.keyCode == '39'){
					for(var i=0; i<enemies.length;i++){
						enemies[i].moveLeft();
					}
					for(var i=0; i<jumps.length;i++){
						jumps[i].moveLeft();
					}
				}
			});
		},
		gametimer: function(){
			setInterval(pub.draw, 1000 / FPS);
		},
		collision:function(object){
			//FOR LOOP
			boxU = player.getBox();
			boxE = object.getBox();

			playerLeft = player.getX();
			enemyLeft = object.getX();

		  playerRight = playerLeft + boxU.w;
		  enemyRight = enemyLeft + boxE.w;

		  playerTop = player.getY();
		  enemyTop = object.getY();

		  playerBottom = playerTop + boxU.h;
		  enemyBottom = enemyTop + boxE.h;

		  if (playerBottom < enemyTop) return false;
		  if (playerTop > enemyBottom) return false;
		  if (playerRight < enemyLeft) return false;
		  if (playerLeft > enemyRight) return false;

		  return true;
		},
		generateEnemy:function(){
			if(draw){
				enemy = new GM.enemy();
				enemy.setStart(Math.floor(Math.random() * gameWidth) , gameHeight);
				enemies.push(enemy);
			}
			timerEnemy = setTimeout(pub.generateEnemy, Math.floor(Math.random() * 1000)+50);
		},
		generateJumps:function(){
			if(draw){
				jump = new GM.jump();
				jump.setStart(Math.floor(Math.random() * gameWidth) , gameHeight);
				jumps.push(jump);
			}
			timerJump = setTimeout(pub.generateJumps, Math.floor(Math.random() * 1000)+50);
		},
		stopEverything:function(){
			player.setMove('stop');
			player.fwd();
			draw = false;
		},
		startEverything:function(){
			player.setMove('fwd');
			player.fwd();
			draw = true;
		},
		draw: function(){
			if(draw){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if(enemies.length > 0){			
					for(var i=0; i < enemies.length; i++){
						
						if(!(player.getMove() == 'up' || player.getMove() == 'down')){
							if(pub.collision(enemies[i])){
								pub.stopEverything();
							}
						}
						enemies[i].fwd();
						if(enemies[i].getY() < 0){
							enemies.splice(i,1);
						}
					}
				}	
				if(jumps.length > 0){
					for(var i=0; i < jumps.length; i++){
						if(pub.collision(jumps[i])){
							player.jumpUp();
						}
						jumps[i].fwd();
						if(jumps[i].getY() < 0){
							jumps.splice(i,1);
						}
					}
				}
				player.fwd();
			}else{
				setTimeout(pub.startEverything, 3000);
			}
		}
	};
	return pub;
};