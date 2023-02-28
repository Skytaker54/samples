import Game from './game.js';
import Cell from './cell.js';
import Snake from './snake.js';
import Apple from './apple.js';

export default class Board {
    #snake;
    #apple;
    constructor() {
        this.createCells();
        this.#snake = new Snake(Math.floor(Game.COLUMNS / 2), Math.floor(Game.ROWS / 2));
        this.#apple = new Apple();
    }

    createCells() {
        Game.cells = [];
        if (this.#snake) {
            this.#snake.sizeX = Game.cellWidth;
            this.#snake.sizeY = Game.cellHeight;
            this.#apple.sizeX = Game.cellWidth;
            this.#apple.sizeY = Game.cellHeight;
        }
        for (let i = 0; i < Game.ROWS; i++) {
            Game.cells.push([]);
            for (let j = 0; j < Game.COLUMNS; j++) {
                Game.cells[i].push(new Cell(Game.cellWidth * j, Game.cellHeight * i));
            }
        }
        this.drawCells();
    }

    drawCells() {
        Game.ctx.beginPath();
        Game.ctx.lineWidth = 2;
        Game.ctx.strokeStyle = 'gray';
        Game.cells.forEach(row => row.forEach(cell => Game.ctx.rect(cell.x, cell.y, cell.x + Game.cellWidth, cell.y + Game.cellHeight)));
        Game.ctx.closePath();
        Game.ctx.stroke();
    }

    move(direction) {
        // board outline
        Game.ctx.beginPath();
        Game.ctx.strokeStyle = 'darkblue';
        Game.ctx.lineWidth = 3;
        Game.ctx.rect(0, 0, Game.width, Game.height);
        Game.ctx.closePath();
        Game.ctx.stroke();

        this.drawCells();
        this.#apple.draw();
        this.#snake.move(direction);

        // on apple eaten
        if (this.#snake.head && this.#snake.head.x === this.#apple.x && this.#snake.head.y === this.#apple.y) {
            Game.crunch.currentTime = 0;
            Game.crunch.play();
            this.#snake.addTail();
            this.#apple.place();
            Game.speed = Game.speed * .9;
            Game.score++;
            Game.scoreCard.text(Game.score);
        }
    }
}