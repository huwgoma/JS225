class Expense {
  #id;
  #amount;
  #date;
  #category;

  constructor(id, amount, date, category) {
    // Validate
    // - if invalid, return an error object
    this.#id       = id;
    this.#amount   = amount;
    this.#date     = date;
    this.#category = category;
  }

  // Getters
  get id()       { return this.#id }
  get amount()   { return this.#amount }
  get date()     { return this.#date }
  get category() { return this.#category }

  // Expense Validation
  #isValid(id, amount, date, category) {

    // 1) all arguments must be present
    // 2) Date is less than today 
    // 3) amount is greater than 0
    // 4) category is not empty
  }
}

module.exports = Expense;