const ExpenseManager = require('./expenseManager');

class BudgetExpenseManager extends ExpenseManager {
  #totalBudget;

  get remainingBudget() { return this.#totalBudget - this.sumOfExpenses() }  

  constructor(limit) {
    if (typeof limit !== 'number' || Number.isNaN(limit) || limit <= 0) {
      throw new Error('Budget limit must be a positive number.');
    } 
    
    super();
    this.#totalBudget = limit;
  }

  logSummary() {
    super.logSummary();
    console.log(`Budget Remaining:   $${this.remainingBudget.toFixed(2)}/$${this.#totalBudget.toFixed(2)}`);
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