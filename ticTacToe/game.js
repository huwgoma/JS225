const prompt = require('./prompt');
const Board = require("./board");

// Main class for TTT games
class Game {
  #players;
  #board;
  #currentPlayer;
  #gameState;

  static introduce() {
    console.log('Hello - Welcome to Tic Tac Toe!');
    let seeRules = prompt("Would you like to see the rules? (Y/N)")();
    
    if (seeRules.toUpperCase() === 'Y') console.log(Game.#rules);
    console.log('='.repeat(30));
  }

  static #rules = 'Tic Tac Toe is a 2-player game where you and ' +
    'your opponent take turns placing marks (X/O) on a 3-by-3 ' +
    'board. The first player to place 3 marks in any row, column, ' +
    'or diagonal wins!';

  constructor(humanPlayer, computerPlayer) {
    this.#players = [ humanPlayer, computerPlayer ];
    this.#board = new Board();
    this.#currentPlayer = this.#players.find(player => player.mark === 'X');
    this.#gameState = {};
  }

  play() {
    // Game Loop
    do {
      this.#clearScreen();
      this.#drawBoard();

      let targetSquare = this.#getNextMove();
      this.#markBoardAt(targetSquare, this.currentPlayer.mark);

      gameState = this.#getGameState();
      if (!(gameState.over)) this.#swapCurrentPlayer();
    } while (!(gameState.over));

    // End of Game
    this.#clearScreen();
    this.#drawBoard();
    this.#displayResult(gameState);

    // Return gameState for scorekeeping 
    return gameState;
  }

  // Gamestate Calculation
  #getGameState() {
    let winningMark = this.#board.winningMark();
    let winner = this.#players.find(player => { 
      return player.mark === winningMark;
    });

    let over = !!winner || this.#board.isFull();

    return { over, winner };
  }

  // Game Loop Abstractions
  #clearScreen() {
    console.clear();
  }

  #drawBoard() {
    this.#board.draw();
  }

  #getNextMove() {
    return this.currentPlayer.getMove(this.#board);
  }

  #markBoardAt(targetSquare, mark) {
    this.#board.markAt(targetSquare, mark);
  }

  #swapCurrentPlayer() {
    let nextIndex = Number(!this.#players.indexOf(this.currentPlayer));

    this.currentPlayer = this.#players[nextIndex];
  }

  #displayResult(gameState) {
    console.log('Game over!');

    if (gameState.winner) {
      console.log(`${gameState.winner.name} wins this round!`);
    } else {
      console.log("It's a tie!");
    }
  }
}

module.exports = Game;