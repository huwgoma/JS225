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
    let humanName = this.#getName();
    let humanMark = this.#getMark().toUpperCase();
    let computerMark = humanMark === 'X' ? 'O' : 'X';

    this.humanPlayer = new HumanPlayer(humanName, humanMark);
    this.computerPlayer = new ComputerPlayer(computerMark);

    console.log(this.humanPlayer, this.computerPlayer)
    // only 1-p for now
    // prompt name 
    // prompt mark choice
    // create players
    // create board
    // set current player
  }

  play() {
    // welcome + rules
    // prompt name
    // prompt mark choice [X or O]
    // create players ( player1, player2 )
    // >> create HumanPlayer with mark choice
    // >> create ComputerPlayer with other mark
    // create board
    // set currentPlayer = X Player

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

  #getName = prompt(
    "What's your name?",
    (name) => name.length > 0,
    "Sorry, your name can't be empty!"
  );

  
  #getMark = prompt(
    "Would you like to play as X or O?",
    (mark) => ['X', 'O'].includes(mark.toUpperCase()),
    "Please enter either X or O."
  );
}

module.exports = Game;