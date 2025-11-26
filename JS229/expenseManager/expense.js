const Utilities = require('./utilities');

class Expense {
  #id;
  #amount;
  #date;
  #category;

  constructor(id, amount, date, category) {
    if (this.#isValid(id, amount, date, category)) {
      this.#id       = id;
      this.#amount   = amount;
      this.#date     = Utilities.dateOnly(date);
      this.#category = category;
    } else {
      throw new Error('Invalid expense data.');
    }
  }

  // Getters
  get id()       { return this.#id }
  get amount()   { return this.#amount }
  get date()     { return new Date(this.#date) }
  get category() { return this.#category }

  // Expense Validation
  #isValid(id, amount, date, category) {
    return (
      this.#allFieldsGiven(id, amount, date, category) &&
      this.#dateIsValid(date) &&
      this.#amountIsValid(amount) &&
      this.#categoryIsValid(category)
    );
  }

  #allFieldsGiven(...args) {
    return args.length === 4 &&
           args.every(arg => arg !== undefined);
  }

  #dateIsValid(date) {
    if (!(date instanceof Date)) return false;

    let today = Utilities.dateOnly(new Date());
    let dateCopy = Utilities.dateOnly(date);

    return dateCopy <= today;
  }

  #amountIsValid(amount) {
    if (typeof amount !== 'number') return false;

    return amount > 0;
  }

  // Category needs to be validated for inclusion at the Expense Manager level
  #categoryIsValid(category) {
    if (typeof category !== 'string') return false;

    return category.length > 0;
  }
}

module.exports = Expense;