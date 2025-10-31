const prompt = require('./prompt');
const { HumanPlayer, ComputerPlayer } = require("./player");

class GameManager {
  #game;

  constructor(game) {
    this.#game = game;
  }

  start() {
    this.#game.introduce();
    let playerName = GameManager.#getName();
    let playerMark = GameManager.#getMark();
    let computerMark = playerMark === 'X' ? 'O' : 'X';

    let player = new HumanPlayer(playerName, playerMark, GameManager.#getMove);
    let cpu = new ComputerPlayer(computerMark);

    GameManager.#getTargetScore();
    // introduce 
    // get names and mark preference
    // create players
    // - human player: pass in prompting logic with a validator call
    //    back that checks 
    // ** without board
    // play up to ___ wins

    // initialize score 
    // until one player reaches target score
    // - create new game
    // -- get move (pass board to both human and cpu)
    //  >> human: prompt, check against board for emptiness, return
    // after game ends, get winner

    // introduce?
    // play up to ___ wins

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

  static #getMove = prompt(
    "Please enter the square you'd like to mark (1-9).",
    (square, board) => board.emptyAt(square),
    "Sorry, that's not a valid (empty) square."
  );

  static #getTargetScore = prompt(
    "How many wins would you like to play up to?",
    (target) => /^[1-9][0-9]*$/.test(target),
    "Sorry, that's not a valid positive number."
  );

}

module.exports = GameManager;