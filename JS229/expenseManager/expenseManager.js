const Expense = require('./expense');

// Expense Manager Class (Base)
class ExpenseManager {
  // How to store expenses?
  // >> array
  #expenses = [];
  #categories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health'];

  logSummary() {
    console.log(`Number of Expenses:  ${this.#expenses.length}`);
    console.log(`Total Spent:        $${this.#sumOfExpenses().toFixed(2)}`);
    console.log(`Average Expense:    $${this.#averageExpense().toFixed(2)}`);
  }

  addExpense(amount, date, category) {
    if (!(this.#categories.includes(category))) { 
      console.log('Invalid expense category.');
      return;
    }

    try {
      let newExpense = new Expense(this.#generateID(), amount, date, category);
      this.#expenses.push(newExpense);
      console.log(`Successfully added expense!`);
    } catch (error) {
      console.log(`Could not add expense: ${error.message}`);
    }
  }

  // removeExpense(id) {
  //   let expense = this.#findExpense(id);

  //   if (expense) {
  //     let indexOfExpense = this.#expenses.indexOf(expense);
  //     this.#expenses.splice(indexOfExpense, 1);
  //     console.log(`Expense #${id} successfully deleted.`);
  //   } else {
  //     console.log(`That expense (id = ${id}) could not be found.`);
  //   }
  // }

  // Helpers
  #generateID = (function() {
    let nextID = 0;

    return function() { return nextID++ }
  })();

  #findExpense(id) {
    return this.#expenses.find(expense => expense.id === id);
  }

  #sumOfExpenses() {
    return this.#expenses.reduce((sum, expense) => {
      sum += expense.amount;
      return sum;
    }, 0);
  }

  #averageExpense() {
    return this.#sumOfExpenses() / this.#expenses.length;
  }
  
  // Remove an expense by id.
  // Summarize expenses (total spent, average amount, and count).
  // Filter expenses by a date range.
  // Filter expenses by category.
  // Add a new allowed category.
  // Retrieve the current list of allowed categories.
}

module.exports = ExpenseManager;