// Imports
const Game = require("./game");
const Board = require("./board");
const { Player, HumanPlayer, ComputerPlayer } = require("./player");

Game.introduction();

new Game().play();