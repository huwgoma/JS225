const IO = require('./io');
const { HumanPlayer, ComputerPlayer } = require("./player");

class GameManager {
  #gameType;

  constructor(gameType) {
    this.#gameType = gameType;
  }

  start() {
    this.#gameType.introduce();
    let playerName = GameManager.#getName();
    let playerMark = GameManager.#getMark();
    let computerMark = playerMark === 'X' ? 'O' : 'X';

    let player = new HumanPlayer(playerName, playerMark, GameManager.#getMove);
    let cpu = new ComputerPlayer(computerMark);

    let targetScore = parseInt(GameManager.#getTargetScore(), 10);

    do { 
      let game = new this.#gameType(player, cpu);
      game.play();
      
      // End of Game
      
      // - Clear screen
      // - Increment score
      // - Display score
      // - Pause until keypress
      // Pause to display game result
      GameManager.#getAnyKey();

      let winner = game.state.winner;
      if (winner) winner.addScore();
    } while (player.score < targetScore && cpu.score < targetScore)

    // End of Match
    let [ finalWinner, finalLoser ] = [ player, cpu ].sort((p1, p2) => p2.score - p1.score);

    console.log(`Game over! ${finalWinner.name} wins, ${finalWinner.score}-${finalLoser.score}!`);
    console.log('Thanks for playing!');
  }

  // Prompt Methods
  static #getName = IO.createPrompt(
    "What's your name?",
    (name) => name.length > 0,
    "Sorry, your name can't be empty!"
  );

  static #getMark = IO.createPrompt(
    "Would you like to play as X or O? X will move first.",
    (mark) => ['X', 'O'].includes(mark.toUpperCase()),
    "Please enter either X or O."
  );

  static #getMove = IO.createPrompt(
    "Please enter the square you'd like to mark (1-9).",
    (square, board) => board.emptyAt(square),
    "Sorry, that's not a valid (empty) square."
  );

  static #getTargetScore = IO.createPrompt(
    "How many wins would you like to play up to?",
    (target) => /^[1-9][0-9]*$/.test(target),
    "Sorry, that's not a valid positive number."
  );

  static #getAnyKey = IO.createPrompt("Press any key to continue:");
}

module.exports = GameManager;