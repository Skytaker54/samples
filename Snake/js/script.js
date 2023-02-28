import '../css/style.css';
import Game from './game.js';
import Board from './board.js';
import $ from 'jquery';
import Hammer from 'hammerjs';

(() => {
    'use strict';
    // get canvas context, make resizable
    let board;
    Game.leaderBoard.text(Number(localStorage.getItem('highScore')));
    const gameFrame = $('#gameFrame');
    const cnvs = $('#theCanvas');
    function setCanvas() {
        cnvs.prop({ 'width': gameFrame.width(), 'height': gameFrame.height() });
        Game.width = cnvs.width();
        Game.height = cnvs.height();
        Game.cellWidth = Game.width / Game.COLUMNS;
        Game.cellHeight = Game.height / Game.ROWS;
    }
    window.addEventListener('resize', () => {
        if (board) {
            setCanvas();
            board.createCells();
        }
    });
    Game.ctx = cnvs[0].getContext('2d');



    // assign directions
    let direction;
    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                direction = 'up';
                break;
            case 'ArrowRight':
            case 'd':
                direction = 'right';
                break;
            case 'ArrowDown':
            case 's':
                direction = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
                direction = 'left';
                break;
        }
    });

    // assign directions mobile
    const hmr = new Hammer(cnvs[0]);
    hmr.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hmr.on('swipeleft', () => direction = 'left');
    hmr.on('swiperight', () => direction = 'right');
    hmr.on('swipeup', () => direction = 'up');
    hmr.on('swipedown', () => direction = 'down');

    // run game
    function runGame() {
        Game.ctx.clearRect(0, 0, cnvs.width(), cnvs.height());
        board.move(direction);
        if (!Game.gameOver) {
            setTimeout(runGame, Game.speed);
        } else {
            if(Game.score > Number(Game.leaderBoard.text())){
                Game.leaderBoard.text(Game.scoreCard.text());
                localStorage.setItem('highScore', Game.score);
            }
            Game.crash.currentTime = 0;
            Game.crash.play();
            Game.ctx.clearRect(0, 0, cnvs.width(), cnvs.height());
            start.toggle();
        }
    }

    // set button to start up game
    const start = $('#startButton');
    start.on('click', () => {
        start.toggle();
        // create board, add components
        setCanvas();
        board = new Board;
        Game.gameMusic.currentTime = 0;
        Game.gameMusic.loop = true;
        Game.gameMusic.play();

        // reset game
        Game.score = 0;
        Game.scoreCard.text(Game.score);
        Game.speed = 50;
        Game.gameOver = false;

        runGame();
    });
})();

