const Expense = require('./expense');
const DateFormat = require('./dateFormat');

// Expense Manager Class (Base)
class ExpenseManager {
  #expenses = [];
  #categories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health'];
  #nextID = 1;

  get expenses()   { return this.#expenses.slice() }
  get categories() { return this.#categories.slice() }
  get summary() { 
    return {
      count:   this.#expenses.length,
      total:   Number(this.sumOfExpenses().toFixed(2)),
      average: Number(this.#averageExpense().toFixed(2)),
    }
  }

  logSummary() {
    console.log(`Number of Expenses:  ${this.summary.count}`);
    console.log(`Total Spent:        $${this.summary.total.toFixed(2)}`);
    console.log(`Average Expense:    $${this.summary.average.toFixed(2)}`);
  }

  addExpense(amount, date, category) {
    let id = this.#generateID();

    if (!(this.#categories.includes(category))) throw new Error('Invalid expense category.');

    let newExpense = new Expense(id, amount, date, category);
    this.#expenses.push(newExpense);
    return newExpense;
  }

  removeExpense(id) {
    let expense = this.#findExpense(id);

    if (expense) {
      let indexOfExpense = this.#expenses.indexOf(expense);
      this.#expenses.splice(indexOfExpense, 1);
      console.log(`Expense #${id} successfully removed.`);
      return expense;
    } else {
      console.log(`That expense (id = ${id}) could not be found.`);
    }
  }

  filterByDateRange(startDate, endDate) {
    let workingStartDate = DateFormat.dateOnly(startDate);
    let workingEndDate   = DateFormat.dateOnly(endDate);

    return this.#expenses.filter(expense => {
      return expense.date <= workingEndDate && expense.date >= workingStartDate;
    });
  }

  filterByCategory(category) {
    return this.#expenses.filter(expense => expense.category === category);
  }

  addCategory(newCategory) {
    if (this.#categories.includes(newCategory)) return console.log(`Category '${newCategory}' already exists.`);
    if (newCategory.trim().length === 0) return console.log('Category name cannot be empty.');

    this.#categories.push(newCategory);
    console.log(`Successfully added ${newCategory} as a new category.`);
  }

  // Helpers
  #generateID() { return this.#nextID++ }

  #findExpense(id) {
    return this.#expenses.find(expense => expense.id === id);
  }

  // Public so it can be inherited by subclass (budget expense manager)
  sumOfExpenses() {
    return this.#expenses.reduce((sum, expense) => {
      sum += expense.amount;
      return sum;
    }, 0);
  }

  #averageExpense() {
    if (this.#expenses.length === 0) return 0;

    return this.sumOfExpenses() / this.#expenses.length;
  }
}

module.exports = ExpenseManager;