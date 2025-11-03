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
}

// Game-Specific IO Methods
class GameIO {
  static getName = IO.createPrompt(
    "What's your name?",
    (name) => name.trim().length > 0,
    "Sorry, your name can't be empty!"
  )
}

module.exports = GameIO;