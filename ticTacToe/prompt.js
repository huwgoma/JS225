const readLine = require("readline-sync");
// Return a function that, when invoked, prompts the user for 
// input until a valid input is given.
// - Validity is determined by the callback.

function makePrompter(prompt, validator, error) {
  validator ||= () => true;

  return function() {
    let input = '';

    do {
      input = readLine.question(prompt + "\n").trim();

      console.log(validator(input))
      if (!validator(input)) console.log(error + "\n");

    } while (!validator(input));

    return input;
  }
}

module.exports = makePrompter;