const ExpenseManager = require('./expenseManager');

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

let manager = new ExpenseManager();

// Usage:
// Adding Expenses
console.log('Adding Expenses ======================================================');
manager.addExpense(-1, today, 'Food');    // Invalid Price -> "Could not add expense: Invalid expense data."
manager.addExpense(13, tomorrow, 'Food'); // Invalid Date  -> "Could not add expense: Invalid expense data."

manager.addExpense(13, today);                  // Invalid Category -> "Invalid expense category."
manager.addExpense(13, today, 'Bad Category');  // Invalid Category -> "Invalid expense category."

manager.addExpense(13, today, 'Food');          // #5 -- Deleted --
manager.addExpense(30, today, 'Health');        // #6
manager.addExpense(15, today, 'Entertainment'); // #7

// Summarizing Expenses
console.log('Summarizing Expenses ======================================================');
manager.logSummary(); // Logs Count = 3, Total = 58.00, Average = 19.33

// Removing Expenses
console.log('Removing Expenses ======================================================');
manager.removeExpense(67); // Logs 'That expense (id = 67) could not be found.'
manager.removeExpense(5); // Logs 'Expense #5 successfully removed.'

manager.logSummary(); // Logs Count = 2, Total = 45.00, Average: 22.50

// Filtering Expenses
console.log('Filtering Expenses ======================================================');
// > By Date
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);
const sixDaysAgo = new Date(today);
sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

manager.addExpense(120, lastWeek, 'Health');        // #8
manager.addExpense(25,  lastWeek, 'Entertainment'); // #9

let last6DayExpenses = manager.filterByDateRange(sixDaysAgo, today);
console.log(last6DayExpenses.length); // 2

// > By Category