import $ from 'jquery';
import soundmusic from '../audio/game-music.mp3';
import soundcrash from '../audio/crash.mp3';
import soundcrunch from '../audio/crunch.mp3';

export default class Game {
    static ROWS = 7;
    static COLUMNS = 12;
    static cellWidth;
    static cellHeight;
    static frameRate = 10;
    static cells = [];
    static width;
    static speed;
    static ctx;
    static gameOver = false;
    static growing = false;
    static score = 0;
    static scoreCard = $('#score');
    static leaderBoard = $('#highScore');

    // music
    static gameMusic = new Audio(soundmusic);
    static crash = new Audio(soundcrash);
    static crunch = new Audio(soundcrunch);
}