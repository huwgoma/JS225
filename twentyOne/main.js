// Twenty-One
const Game = require('./game');

Game.introduce();
let game = new Game();

game.play();
game.announceResult();
