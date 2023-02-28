export default class Cell {
    x;
    y;
    occupied;
    constructor(x, y, occupied = false) {
        this.x = x;
        this.y = y;
        this.occupied = occupied;
    }
}