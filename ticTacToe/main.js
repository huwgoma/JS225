// Imports
const Game = require("./game");
const GameManager = require("./gameManager");

let session = new GameManager(Game);

session.start();

// Display score at the top always (through screen clears?)
// screen clears happen in game rn
// 