const ExpenseManager = require('./expenseManager');

class BudgetExpenseManager extends ExpenseManager {
  #remainingBudget;

  get remainingBudget() { return this.#remainingBudget }

  constructor(limit) {
    if (typeof limit !== 'number' || Number.isNaN(limit) || limit <= 0) {
      throw new Error('Budget limit must be a positive number.');
    } 
    
    super();
    this.#remainingBudget = limit;
  }

  logSummary() {
    // logs stuff from base EM class but also logs amount used / total budget
  }
  
  addExpense(amount, date, category) {
    // verify that currentAmount + amount <= limit 
    // 
    // then create and add expense as normal
    // - subtract amount from remainingBudget
  }

  
}

module.exports = BudgetExpenseManager;