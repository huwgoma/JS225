const readLine = require("readline-sync");
// Return a function that, when invoked, prompts the user for 
// input until a valid input is given.
// - Validity is determined by the callback.

function makePrompter(prompt, validator, error) {
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

module.exports = makePrompter;