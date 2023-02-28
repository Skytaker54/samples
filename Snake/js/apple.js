import Game from './game.js';
import appleimg from '../images/apple.png';

export default class Apple {
    x;
    y;
    #img;

    constructor() {
        this.place();
        this.#loadImages();
    }
    place() {
        do {
            this.x = Math.floor(Math.random() * Game.COLUMNS);
            this.y = Math.floor(Math.random() * Game.ROWS);
        } while (Game.cells[this.y][this.x].occupied);
    }
    #loadImages() {
        this.#img = new Image();
        this.#img.src = appleimg;
        this.draw();
    }
    draw() {
        Game.ctx.beginPath();
        const p1 = Game.cells[this.y][this.x].x;
        const p2 = Game.cells[this.y][this.x].y;
        Game.ctx.drawImage(this.#img, p1, p2, Game.cellWidth, Game.cellHeight);
        Game.ctx.closePath();
    }
}