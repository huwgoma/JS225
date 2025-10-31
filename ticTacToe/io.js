const readLine = require("readline-sync");

// Input/Output Utilities
class IO { 
  static createPrompt(prompt, validator, error) {
    validator ||= () => true;

    return function(...args) {
      let input = '';

      do {
        input = readLine.question(prompt + "\n").trim();
        if (!validator(input, ...args)) console.log(error + "\n");

      } while (!validator(input, ...args));

      return input;
    }
  }

  static clearScreen() { console.clear() }

  static getAnyKey() { IO.createPrompt("Press any key to continue:") }
}

class GameIO extends IO {
  static displayBoard(board) { console.log(board.toString()) }

  static displayResult(state) {
    if (state.winner) {
      console.log(`${state.winner.name} wins this round!`);
    } else {
      console.log("It's a tie!");
    }
  }

  static displayScore(players) {
    let scoreString = players.map(player => `${player.name}: ${player.score}`).join(' | ');
    console.log(`Current Score: ${scoreString}\n`);
  }
}

module.exports = GameIO;