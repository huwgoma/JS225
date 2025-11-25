const ExpenseManager = require('./expenseManager');

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

let manager = new ExpenseManager();

// Usage:
// Adding Invalid Expenses logs "Could not add expense: Invalid expense data."
manager.addExpense(-1, today, 'Food');    // Invalid Price
manager.addExpense(13, tomorrow, 'Food'); // Invalid Date

manager.addExpense(13, today);                  // Invalid Category -> "Invalid expense category."
manager.addExpense(13, today, 'Bad Category');  // Invalid Category -> "Invalid expense category."