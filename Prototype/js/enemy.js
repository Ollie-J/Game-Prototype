var enemy = new Character2();

function Character2() {
    this.tileFrom = [20, 40]
    this.tileTo = [20, 40]
    this.timeMoved = 0;
    this.dimensions = [40, 40];
    //first digit = left or right X
    //second digit = up or down Y
    this.position = [280, 160];
    //enemy speed
    this.delayMove = 0;
}
Character2.prototype.placeAt = function (x, y) {
    this.tileFrom = [2, 4]
    this.tileTo = [2, 4]
    this.position = [((tileW * x) + ((tileW - this.dimensions[0]) / 2)),
    ((tileH * y) + ((tileH - this.dimensions[1]) / 2))];
};

var enemy2 = new Character3();

function Character3() {

}





