// Imports
const Game = require("./game");
const GameManager = require("./gameManager");

let session = new GameManager(Game);

session.start();