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