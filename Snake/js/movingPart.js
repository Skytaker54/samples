import Game from './game.js';

export default class MovingPart {
    #img;
    constructor(x, y, img, movingX = 0, movingY = 0) {
        this.x = x;
        this.y = y;
        this.movingX = movingX;
        this.movingY = movingY;
        this.#img = img;
    }
    draw() {
        Game.ctx.beginPath();
        const p1 = Game.cells[this.y][this.x].x + ((Game.cellWidth / Game.frameRate) * this.movingX);
        const p2 = Game.cells[this.y][this.x].y + ((Game.cellHeight / Game.frameRate) * this.movingY);
        Game.ctx.drawImage(this.#img, p1, p2, Game.cellWidth, Game.cellHeight);
        Game.ctx.closePath();
    }
    move(direction, head = false) {
        if (this.movingY != 0 || this.movingX != 0) {
            if (this.movingY > 0) {
                this.movingY--;
            } else if (this.movingY < 0) {
                this.movingY++;
            }
            if (this.movingX > 0) {
                this.movingX--;
            } else if (this.movingX < 0) {
                this.movingX++;
            }
            this.draw();
            return false;
        }
        let X = this.x;
        let Y = this.y;
        switch (direction) {
            case 'up':
                Y--;
                this.movingY = Game.frameRate;
                break;
            case 'right':
                X++;
                this.movingX = -Game.frameRate;
                break;
            case 'down':
                Y++;
                this.movingY = -Game.frameRate;
                break;
            case 'left':
                X--;
                this.movingX = Game.frameRate;
                break;
        }

        if (Game.cells.length <= Y || Y < 0 ||
            Game.cells[Y].length <= X || X < 0) {
            Game.gameOver = true;
            return;
        }
        if (head && Game.cells[Y][X].occupied) {
            Game.gameOver = true;
            return;
        }
        Game.cells[Y][X].occupied = true;
        Game.cells[this.y][this.x].occupied = false;
        this.x = X;
        this.y = Y;
        this.draw();
        return true;
    }
}