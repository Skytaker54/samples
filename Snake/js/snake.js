import MovingPart from './movingPart.js';
import headimg from '../images/head.png';
import bodyimg from '../images/body.png';

export default class Snake {
    head;
    #body;
    #tail = [];
    #turn;
    #wake = [];
    #growing = false;

    constructor(x, y) {
        let temp;
        temp = new Image();
        temp.src = headimg;
        this.head = new MovingPart(x, y, temp); 
        this.head.draw();
        this.#body = new Image();
        this.#body.src = bodyimg;
    }
    move(direction) {
        if (!this.#growing) {
            this.#tail.forEach((part, index) => part.move(this.#wake[index]));
        } else {
            this.#tail.forEach((part) => part.draw());
        }
        if (this.head) {
            this.#turn = this.head.move(direction, true);
        }
        if (this.#turn) {
            this.#wake.unshift(direction);
            this.#growing = false;
            this.#turn = false;
        }
    }
    addTail() {
        this.#tail.unshift(new MovingPart(this.head.x, this.head.y, this.#body, this.head.movingX, this.head.movingY));
        this.#growing = true;
    }
}