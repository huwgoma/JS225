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