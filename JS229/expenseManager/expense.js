class Expense {
  #id;
  #amount;
  #date;
  #category;

  constructor(id, amount, date, category) {
    if (this.#isValid(id, amount, date, category)) {
      this.#id       = id;
      this.#amount   = amount;
      this.#date     = date;
      this.#category = category;
    } else {
      return { invalid: true }
    }
    // Validate
    // - if invalid, return an error object
    
  }

  // Getters
  get id()       { return this.#id }
  get amount()   { return this.#amount }
  get date()     { return this.#date }
  get category() { return this.#category }

  // Expense Validation
  #isValid(id, amount, date, category) {
    return (
      this.#allFieldsGiven(id, amount, date, category) 
      // &&
      // this.#dateIsValid(date) 
    // &&
    //   this.#amountIsValid(amount) &&
    //   this.#categoryIsValid(category)
    );
    // 1) all arguments must be present
    // 2) Date is less than today 
    // 3) amount is greater than 0
    // 4) category is not empty
  }

  #allFieldsGiven(...args) {
    return args.length === 4 &&
           args.every(arg => arg !== undefined);
  }
}

module.exports = Expense;