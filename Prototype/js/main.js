var ctx = null;

function toIndex(x, y) {
	return ((y * mapW) + x);
}

window.onload = function () {
	ctx = document.getElementById('game').getContext("2d");
	requestAnimationFrame(drawGame);
	ctx.font = "bold 10pt sans-serif";
	//on key down 

	window.addEventListener("keydown", function (e) {
		if (e.keyCode >= 65 && e.keyCode <= 87) { keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function (e) {
		if (e.keyCode >= 65 && e.keyCode <= 87) { keysDown[e.keyCode] = false; }
	});
};

//rendering in the tilemap //1 = player can pass though // 0 = not passable
//FPS counter

function drawGame() {
	if (ctx == null) { return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;

	var sec = Math.floor(Date.now() / 1000);
	if (sec != currentSecond) {
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
	}
	else { frameCount++; }
	//the key codes allowing player movment and define 
	//rendering in the tilemap //1 = player can pass though // 0 = not passable
	// FPS is defined by the player movement
	if (!player.processMovement(currentFrameTime)) {
		if (keysDown[87] && player.tileFrom[1] > 0 && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] - 1)] == 1) { player.tileTo[1] -= 1; }
		else if (keysDown[83] && player.tileFrom[1] < (mapH - 1) && gameMap[toIndex(player.tileFrom[0], player.tileFrom[1] + 1)] == 1) { player.tileTo[1] += 1; }
		else if (keysDown[65] && player.tileFrom[0] > 0 && gameMap[toIndex(player.tileFrom[0] - 1, player.tileFrom[1])] == 1) { player.tileTo[0] -= 1; }
		else if (keysDown[68] && player.tileFrom[0] < (mapW - 1) && gameMap[toIndex(player.tileFrom[0] + 1, player.tileFrom[1])] == 1) { player.tileTo[0] += 1; }

		if (player.tileFrom[0] != player.tileTo[0] || player.tileFrom[1] != player.tileTo[1]) { player.timeMoved = currentFrameTime; }
	}

	for (var y = 0; y < mapH; ++y) {
		for (var x = 0; x < mapW; ++x) {
			switch (gameMap[((y * mapW) + x)]) {
				case 0:
					//tilemap colour
					ctx.fillStyle = "black";
					break;
				default:
					//tilemap background colour
					ctx.fillStyle = "grey";
			}

			ctx.fillRect(x * tileW, y * tileH, tileW, tileH);
		}
	}


	// player
	ctx.fillStyle = "white";
	ctx.fillRect(player.position[0], player.position[1],
		player.dimensions[0], player.dimensions[1]);
	//fps 
	ctx.fillStyle = "white";
	ctx.fillText("FPS: " + framesLastSecond, 10, 20);
	//enemy1
	ctx.fillStyle = "blue";
	ctx.fillRect(enemy.position[0], enemy.position[0],
		enemy.dimensions[0], enemy.dimensions[0]);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}