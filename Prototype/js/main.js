var ctx = null;
//gamemap/tilemap //1 = player can pass though // 0 = not passable
// planned the tilemap in my notepad // use for evidence in the write up 
// used https://www.creativebloq.com/html5/build-tile-based-html5-game-31410992 to find the way to design tileMaps
var gameMap = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 0, 1, 0, 1, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
	0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 
	0, 1, 1, 1, 0, 0, 0, 1, 1, 0,
	0, 1, 0, 1, 0, 1, 1, 1, 1, 0,
	0, 1, 1, 1, 0, 1, 1, 0, 1, 0,
	0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
	0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
	0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileW = 40, tileH = 40;
var mapW = 10, mapH = 40;
var currentSecond = 0, frameCount = 0, framesLastSecond = 0, lastFrameTime = 0;
// I used https://keycode.info/ to find the right JAVA keycodes as I wanted the controls to be WASD instead of the arrow keys.
var keysDown = {
	65 : false, // A
	87 : false, // W
	68 : false,	// S
	83 : false // D
};

//player
var player = new Character();
//player properties
function Character()
{
	this.tileFrom	= [0,0];
	this.tileTo		= [1,1];
	this.timeMoved	= 0;
	this.dimensions	= [40,40];
	this.position	= [45,45];
	//player speed
	this.delayMove	= 300;
}
// placement of player
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};

//1 = player can pass though this block in thje tilemap will be invisible 
//0 = not passable which means its a block, the block will be black

Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}

	return true;
}

function toIndex(x, y)
{
	return((y * mapW) + x);
}

window.onload = function()
{
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";
	//on key down 

	window.addEventListener("keydown", function(e) {
		if(e.keyCode>=65 && e.keyCode<=87) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=65 && e.keyCode<=87) { keysDown[e.keyCode] = false; }
	});
};

//rendering in the tilemap //1 = player can pass though // 0 = not passable
//FPS counter

function drawGame()
{
	if(ctx==null) { return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now()/1000);
	if(sec!=currentSecond)
	{
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }
	//the key codes allowing player movment and define 
	//rendering in the tilemap //1 = player can pass though // 0 = not passable
	// FPS is defined by the player movement
	if(!player.processMovement(currentFrameTime))
	{
		if(keysDown[87] && player.tileFrom[1]>0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]-1)]==1) { player.tileTo[1]-= 1; }
		else if(keysDown[83] && player.tileFrom[1]<(mapH-1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1]+1)]==1) { player.tileTo[1]+= 1; }
		else if(keysDown[65] && player.tileFrom[0]>0 && gameMap[toIndex(player.tileFrom[0]-1, player.tileFrom[1])]==1) { player.tileTo[0]-= 1; }
		else if(keysDown[68] && player.tileFrom[0]<(mapW-1) && gameMap[toIndex(player.tileFrom[0]+1, player.tileFrom[1])]==1) { player.tileTo[0]+= 1; }

		if(player.tileFrom[0]!=player.tileTo[0] || player.tileFrom[1]!=player.tileTo[1])
		{ player.timeMoved = currentFrameTime; }
	}

	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			switch(gameMap[((y*mapW)+x)])
			{
				case 0:
					//tilemap colour
					ctx.fillStyle = "black";
					break;
				default:
					//tilemap background colour
					ctx.fillStyle = "grey";
			}

			ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
		}
	}
	// Colour for the player and FPS counter 
	ctx.fillStyle = "white";
	ctx.fillRect(player.position[0], player.position[1],
		player.dimensions[0], player.dimensions[1]);

	ctx.fillStyle = "white";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}