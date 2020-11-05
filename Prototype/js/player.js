// I used https://keycode.info/ to find the right JAVA keycodes as I wanted the controls to be WASD instead of the arrow keys.
var keysDown = {
    65: false, // A
    87: false, // W
    68: false,	// S
    83: false // D
};

//player
var player = new Character();
//player properties
function Character() {
    this.tileFrom = [0, 0];
    this.tileTo = [1, 1];
    this.timeMoved = 0;
    this.dimensions = [40, 40];
    this.position = [45, 45];
    //player speed
    this.delayMove = 300;
}
// placement of player
Character.prototype.placeAt = function (x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];
    this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
    ((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
};

//1 = player can pass though this block in thje tilemap will be invisible 
//0 = not passable which means its a block, the block will be black

Character.prototype.processMovement = function (t) {
    if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) { return false; }

    if ((t - this.timeMoved) >= this.delayMove) {
        this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else {
        this.position[0] = (this.tileFrom[0] * tileW) + ((tileW - this.dimensions[0]) / 2);
        this.position[1] = (this.tileFrom[1] * tileH) + ((tileH - this.dimensions[1]) / 2);

        if (this.tileTo[0] != this.tileFrom[0]) {
            var diff = (tileW / this.delayMove) * (t - this.timeMoved);
            this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
        }
        if (this.tileTo[1] != this.tileFrom[1]) {
            var diff = (tileH / this.delayMove) * (t - this.timeMoved);
            this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
        }

        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
    }

    return true;
}