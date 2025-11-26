const ExpenseManager = require('./expenseManager');

class BudgetExpenseManager extends ExpenseManager {
  #totalBudget;

  get remainingBudget() { return this.#totalBudget - this.sumOfExpenses() }
  get summary() { 
    let expenseSummary = super.summary;
    console.log(expenseSummary)
    expenseSummary.remainingBudget = Number(this.remainingBudget.toFixed(2));
    expenseSummary.totalBudget = Number(this.#totalBudget.toFixed(2));
    return expenseSummary;
  }

  constructor(limit) {
    if (typeof limit !== 'number' || Number.isNaN(limit) || limit <= 0) {
      throw new Error('Budget limit must be a positive number.');
    } 
    
    super();
    this.#totalBudget = limit;
  }

  logSummary() {
    super.logSummary();
    console.log(`Budget Remaining:   $${this.summary.remainingBudget}/$${this.summary.totalBudget}`);
  }
  
  addExpense(amount, date, category) {
    if (this.remainingBudget - amount < 0) {
      console.log('Budget exceeded! Cannot add expense.');
    } else {
      super.addExpense(amount, date, category);
    }
  }
  
  removeExpense(id) {
    let removedExpense = super.removeExpense(id);
  }
}

module.exports = BudgetExpenseManager;