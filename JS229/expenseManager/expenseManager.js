const Expense = require('./expense');

// Expense Manager Class (Base)
class ExpenseManager {
  // How to store expenses?
  // >> array
  #expenses = [];
  #categories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health'];

  addExpense(amount, date, category) {
    if (!(this.#categories.includes(category))) console.log('Invalid expense category.');

    try {
      let newExpense = new Expense(this.#generateID(), amount, date, category);
      this.#expenses.push(newExpense);
      console.log(`Successfully added expense!`);
    } catch (error) {
      console.log(`Could not add expense: ${error.message}`);
    }
  }

  #generateID = (function() {
    let nextID = 0;

    return function() { return nextID++ }
  })();



  // Add a new expense.
  // Remove an expense by id.
  // Summarize expenses (total spent, average amount, and count).
  // Filter expenses by a date range.
  // Filter expenses by category.
  // Add a new allowed category.
  // Retrieve the current list of allowed categories.
}

module.exports = ExpenseManager;