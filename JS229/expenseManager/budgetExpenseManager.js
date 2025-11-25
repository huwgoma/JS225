const ExpenseManager = require('./expenseManager');

class BudgetExpenseManager extends ExpenseManager {
  #remainingBudget;
  #budgetLimit;

  get remainingBudget() { return this.#remainingBudget }  

  constructor(limit) {
    if (typeof limit !== 'number' || Number.isNaN(limit) || limit <= 0) {
      throw new Error('Budget limit must be a positive number.');
    } 
    
    super();
    this.#budgetLimit = limit;
    this.#remainingBudget = limit;
  }

  logSummary() {
    super.logSummary();
    console.log(`Budget Remaining:   $${this.#remainingBudget.toFixed(2)}/$${this.#budgetLimit.toFixed(2)}`);
  }
  
  addExpense(amount, date, category) {
    // verify that currentAmount + amount <= limit 
    // 
    // then create and add expense as normal
    // - subtract amount from remainingBudget
  }

  
}

module.exports = BudgetExpenseManager;