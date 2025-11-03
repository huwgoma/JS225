const readLine = require("readline-sync");

// Input/Output Utilities
class IO { 
  static horizontalRule = `\n${'='.repeat(80)}\n`;

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
}

// Game-Specific IO Methods
class GameIO extends IO {
  static getName = GameIO.createPrompt(
    "What's your name?",
    (name) => name.trim().length > 0,
    "Sorry, your name can't be empty!"
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