const readLine = require("readline-sync");

// Input/Output Utilities
class IO { 
  static horizontalRule = `\n${'='.repeat(80)}\n`;

  static createPrompt(prompt, validator = () => true, error, transformer = (t) => t) {
    return function(...args) {
      let input = '';

      do {
        input = readLine.question(prompt + "\n").trim();
        if (!validator(input, ...args)) console.log(error + "\n");

      } while (!validator(input, ...args));
      
      return transformer(input);
    }
  }

  static clearScreen() { console.clear() }
}

// Game-Specific IO Methods
class GameIO extends IO {
  static getName = IO.createPrompt(
    "What's your name?",
    (name) => name.trim().length > 0,
    "Sorry, your name can't be empty!",
    (name) => name.trim()
  )

  static getPlayerMove = IO.createPrompt(
    "Would you like to Hit (H) or Stay (S)?",
    (move) => ['H', 'S'].includes(move.toUpperCase()[0]),
    "Sorry, please enter H to Hit (Draw) and S to Stay (Pass).",
    (move) => move.toUpperCase()[0]
  )

  static displayHands(players, hideDealerHand = true) {
    const [ player, dealer ] = players;

    console.log(`${dealer.name}'s Hand:`);
    GameIO.#displayHand(dealer.hand, hideDealerHand);
    
    console.log(GameIO.horizontalRule);

    console.log(`${player.name}'s Hand:`);
    GameIO.#displayHand(player.hand);
  }

  static #displayHand(hand, hideRemaining = false) {
    console.log(hand.map((card, index) => {
      if (hideRemaining && index > 0) return '[[Card Hidden]]';
      
      return card.toString();
    }).join(' | '));
  }
}

module.exports = GameIO;