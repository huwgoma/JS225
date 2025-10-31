const GameIO = require('./io');
const { HumanPlayer, ComputerPlayer } = require("./player");

class GameManager {
  #gameType;

  constructor(gameType) {
    this.#gameType = gameType;
  }

  start() {
    this.#gameType.introduce();
    let playerName = this.#getName();
    let playerMark = this.#getMark().toUpperCase();
    let computerMark = playerMark === 'X' ? 'O' : 'X';

    let player = new HumanPlayer(playerName, playerMark, this.#getMove);
    let cpu = new ComputerPlayer(computerMark);

    let targetScore = parseInt(this.#getTargetScore(), 10);

    do { 
      let game = new this.#gameType(player, cpu);
      game.play();

      // End of Game
      let gameState = game.state;
      GameIO.clearScreen();
      this.#incrementScore(gameState.winner);
      
      GameIO.displayScore([player, cpu]);
      game.drawBoard();
      GameIO.displayResult(gameState);

      GameIO.getAnyKey();
    } while (player.score < targetScore && cpu.score < targetScore)

    // End of Match
    let [ finalWinner, finalLoser ] = this.#sortByScore(player, cpu);

    console.log(`Game over! ${finalWinner.name} wins, ${finalWinner.score}-${finalLoser.score}!`);
    console.log('Thanks for playing!');
  }

  // Prompt Methods
  #getName = GameIO.createPrompt(
    "What's your name?",
    (name) => name.length > 0,
    "Sorry, your name can't be empty!"
  );

  #getMark = GameIO.createPrompt(
    "Would you like to play as X or O? X will move first.",
    (mark) => ['X', 'O'].includes(mark.toUpperCase()),
    "Please enter either X or O."
  );

  #getMove = GameIO.createPrompt(
    "Please enter the square you'd like to mark (1-9).",
    (square, board) => board.emptyAt(square),
    "Sorry, that's not a valid (empty) square."
  );

  #getTargetScore = GameIO.createPrompt(
    "How many wins would you like to play up to?",
    (target) => /^[1-9][0-9]*$/.test(target),
    "Sorry, that's not a valid positive number."
  );

  // Other Helpers
  #incrementScore(winner) {
    if (winner) winner.incrementScore();
  }

  #sortByScore(player1, player2) {
    [ player1, player2 ].sort((p1, p2) => p2.score - p1.score);
  }
}

module.exports = GameManager;