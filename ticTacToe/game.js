const prompt = require('./prompt');
const Board = require("./board");
const { HumanPlayer, ComputerPlayer } = require("./player");


// Main class for TTT games
class Game {
  static introduction() {
    console.log('Hello - Welcome to Tic Tac Toe!');
    let seeRules = prompt("Would you like to see the rules? (Y/N)")();
    
    if (seeRules.toUpperCase() === 'Y') console.log(Game.#rules);
    console.log('='.repeat(30));
  }

  static #rules = 'Tic Tac Toe is a 2-player game where you and ' +
    'your opponent take turns placing marks (X/O) on a 3-by-3 ' +
    'board. The first player to place 3 marks in any row, column, ' +
    'or diagonal wins!';

  constructor() {
    let humanName = Game.#getName();
    let humanMark = Game.#getMark().toUpperCase();
    let computerMark = humanMark === 'X' ? 'O' : 'X';

    this.players = [ 
      new HumanPlayer(humanName, humanMark, this.#getMove),
      new ComputerPlayer(computerMark) 
    ];

    this.board = new Board();

    this.currentPlayer = this.players.find(player => player.mark === 'X');
  }

  play() {
    let gameState;
    // Game Loop
    do {
      // this.#clearScreen();
      this.#drawBoard();

      let targetSquare = this.#getNextMove();
      this.#markBoardAt(targetSquare, this.currentPlayer.mark);

      gameState = this.#getGameState();

      if (!(gameState.over)) this.#swapCurrentPlayer();
      // if (gameState.over) break;

      // this.#swapCurrentPlayer();

      // winner: 
      // 1) Check if there is a winning mark (Board.winningMark)
      // 2) Find the player with the winning mark (null if none)

      // over:
      // 1) If there is a winner -> true
      // 2) or if the board is full -> also true (tie)
      // * otherwise false 

    } while (!(gameState.over)); // while !gameOver

    // Game Ending Logic
  }

  // Gamestate Calculation
  #getGameState() {
    let winningMark = this.board.winningMark();
    let winner = this.players.find(player => { 
      return player.mark === winningMark;
    });

    let over = !!winner || this.board.isFull();

    return { over, winner };
  }

  // Game Loop Abstractions
  #clearScreen() {
    console.clear();
  }

  #drawBoard() {
    this.board.draw();
  }

  #getNextMove() {
    let emptySquares = this.board.emptySquares();
    return this.currentPlayer.getMove(emptySquares);
  }

  #markBoardAt(targetSquare, mark) {
    this.board.markAt(targetSquare, mark);
  }

  #swapCurrentPlayer() {
    let nextIndex = Number(!this.players.indexOf(this.currentPlayer));

    this.currentPlayer = this.players[nextIndex];
  }

  // Prompt Methods
  static #getName = prompt(
    "What's your name?",
    (name) => name.length > 0,
    "Sorry, your name can't be empty!"
  );

  static #getMark = prompt(
    "Would you like to play as X or O? X will move first.",
    (mark) => ['X', 'O'].includes(mark.toUpperCase()),
    "Please enter either X or O."
  );

  #getMove = prompt(
    "Please enter the square you'd like to mark (1-9).",
    (square) => this.board.emptyAt(square),
    "Sorry, that's not a valid (empty) square."
  )
}

module.exports = Game;