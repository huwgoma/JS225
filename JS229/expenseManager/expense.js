class Expense {
  #id;
  #amount;
  #date;
  #category;

  constructor(id, amount, date, category) {
    if (this.#isValid(id, amount, date, category)) {
      this.#id       = id;
      this.#amount   = amount;
      this.#date     = this.#dateOnly(date);
      this.#category = category;
    } else {
      return { invalid: true };
    }
  }

  // Getters
  get id()       { return this.#id }
  get amount()   { return this.#amount }
  get date()     { return this.#date }
  get category() { return this.#category }

  #dateOnly(date) {
    let newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);

    return newDate;
  }

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

    let today = this.#dateOnly(new Date());
    let dateCopy = this.#dateOnly(date);

    return dateCopy <= today;
  }

  #amountIsValid(amount) {
    if (typeof amount !== 'number') return false;

    return amount > 0;
  }

  // Category needs additional inclusion validation at the Expense Manager level 
  #categoryIsValid(category) {
    if (typeof category !== 'string') return false;

    return category.length > 0;
  }
}

module.exports = Expense;