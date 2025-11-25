const ExpenseManager = require('./expenseManager');
const BudgetExpenseManager = require('./budgetExpenseManager');

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
let healthExpenses = manager.filterByCategory('Health');
console.log(healthExpenses.length);   // 2
let noExpenses = manager.filterByCategory('??');
console.log(noExpenses.length);       // 0


// Categories
console.log('Categories ======================================================');
console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']

// - Cannot add an empty category
manager.addCategory('  '); //=> Logs 'Category name cannot be empty.'
console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']
// - Cannot add a duplicate category
manager.addCategory('Food'); //=> Logs "Category 'Food' already exists."
console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']

// - Successfully adding a new category
manager.addCategory('Bills');    //=> Logs 'Successfully added Bills as a new category.'
console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health', 'Bills']
// - Can then add Bill expenses
manager.addExpense(10, today, 'Bills'); // #10 (Successfully added expense!)


// Budget Expense Manager
console.log('\nBudgeting =======================================================\n');
let budgetManager = new BudgetExpenseManager(500);

console.log(budgetManager.remainingBudget); // 500
budgetManager.addExpense(250, today, 'Entertainment');  // #1
budgetManager.addExpense(200, sixDaysAgo, 'Food');      // #2
budgetManager.addExpense(45, lastWeek, 'Health');       // #3

budgetManager.logSummary(); // logs Count = 3, Total = 495, Avg = 165, Budget = 5/500

// - Same filtering capabilities
console.log(budgetManager.filterByDateRange(sixDaysAgo, today).map(e => e.category)); // [Entertainment, Food] 
console.log(budgetManager.filterByCategory('Food').map(e => e.category)); // [ Food ]

// Can't go over budget
budgetManager.addExpense(10, today, 'Health'); // Logs budget exceeded!
console.log(budgetManager.remainingBudget);    // 5
// Zeroing out
budgetManager.addExpense(5, today, 'Health'); // #4
console.log(budgetManager.remainingBudget);   // 0

// Removing expenses restores budget
budgetManager.removeExpense(4);
console.log(budgetManager.remainingBudget);   // 5