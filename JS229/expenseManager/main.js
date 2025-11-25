const ExpenseManager = require('./expenseManager');

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

let manager = new ExpenseManager();

// Invalid Expense -> Logs "Could not add expense: Invalid expense data."
manager.addExpense(-1, today, 'Food');    
manager.addExpense(13, tomorrow, 'Food');
manager.addExpense(13, today);