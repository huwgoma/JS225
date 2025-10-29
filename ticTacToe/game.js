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
    // Game Loop
    do {
      this.board.draw();
      // display board
      
      let target = this.currentPlayer.getMove(this.board.emptySquares());
      this.board.markAt(target, this.currentPlayer.mark);
    } while (true); // while !gameOver

    // Game Ending Logic

    // gameLoop
    // - getMove Loop:
    //  - currentPlayer.getMove
    //  - if board.emptyAt(square), break out of getMove
    //  - otherwise, log error: Square already occupied.
    // - board.placePieceAt(square, mark)
    // - check for gameEnd
    //  -> check for winner -> set winner = currentPlayer -> break
    //  -> check for tie -> break
    // - Swap current player

    // break (gameLoop done)
    // - if winner exists, print win message
    // - otherwise, print tie message
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