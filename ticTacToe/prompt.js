const readLine = require("readline-sync");
// Return a function that, when invoked, prompts the user for 
// input until a valid input is given.
// - Validity is determined by the callback.

function makePrompter(prompt, validator, error) {
  validator ||= () => true;

  return function() {
    let input = '';

    do {
      input = readLine.question(prompt).trim();
      if (!validator(input)) console.log(error);

    } while (!validator(input));

    return input;
  }
}

module.exports = makePrompter;