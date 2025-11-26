const ExpenseManager = require('./expenseManager');
const BudgetExpenseManager = require('./budgetExpenseManager');




// Wrapper Methods
function addExpense(manager, amount, date, category) {
  try { 
    manager.addExpense(amount, date, category);
    console.log('Expense successfully added.');
  } catch(error) {
    console.log(`Expense was not added: ${error.message}`);
  }
}

// Usage:
// > Test Dates
const today = new Date();

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

const sixDaysAgo = new Date(today);
sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

// > Dummy Managers
let manager = new ExpenseManager();
let budgetManager = new BudgetExpenseManager(500);

// Adding Expenses:
console.log('Adding Expenses ======================================================\n');
addExpense(manager, -1, today, 'Food');    // Expense was not added: Invalid expense data.
addExpense(manager, 13, tomorrow, 'Food'); // Expense was not added: Invalid expense data.
addExpense(manager, 13, today);            // Expense was not added: Invalid expense category.
addExpense(manager, 13, today, 'Bad Category');  // Expense was not addded: Invalid expense category.

addExpense(manager, 13, today, 'Food');          // Expense successfully added. #5
addExpense(manager, 30, today, 'Health');        // Expense successfully added. #6
addExpense(manager, 15, today, 'Entertainment'); // Expense successfully added. #7


// // Summarizing Expenses
console.log('Summarizing Expenses ======================================================\n');
manager.logSummary(); // Logs Count = 3, Total = 58.00, Average = 19.33


// // Removing Expenses
// console.log('Removing Expenses ======================================================');
// manager.removeExpense(67); // Logs 'That expense (id = 67) could not be found.'
// manager.removeExpense(5); // Logs 'Expense #5 successfully removed.'

// manager.logSummary(); // Logs Count = 2, Total = 45.00, Average: 22.50


// // Filtering Expenses
// console.log('Filtering Expenses ======================================================');
// // > By Date

// manager.addExpense(120, lastWeek, 'Health');        // #8
// manager.addExpense(25,  lastWeek, 'Entertainment'); // #9

// let last6DayExpenses = manager.filterByDateRange(sixDaysAgo, today);
// console.log(last6DayExpenses.length); // 2

// // > By Category
// let healthExpenses = manager.filterByCategory('Health');
// console.log(healthExpenses.length);   // 2
// let noExpenses = manager.filterByCategory('??');
// console.log(noExpenses.length);       // 0


// // Categories
// console.log('Categories ======================================================');
// console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']

// // - Cannot add an empty category
// manager.addCategory('  '); //=> Logs 'Category name cannot be empty.'
// console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']
// // - Cannot add a duplicate category
// manager.addCategory('Food'); //=> Logs "Category 'Food' already exists."
// console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']

// // - Successfully adding a new category
// manager.addCategory('Bills');    //=> Logs 'Successfully added Bills as a new category.'
// console.log(manager.categories); //=> ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health', 'Bills']
// // - Can then add Bill expenses
// manager.addExpense(10, today, 'Bills'); // #10 (Successfully added expense!)


// Budget Expense Manager
console.log('\nBudgeting =======================================================\n');

console.log(budgetManager.remainingBudget); // 500
addExpense(budgetManager, 250, today, 'Entertainment');  // Expense successfully added. #1
addExpense(budgetManager, 200, sixDaysAgo, 'Food');      // Expense successfully added. #2
addExpense(budgetManager, 45, lastWeek, 'Health');       // Expense successfully added. #3

budgetManager.logSummary(); // logs Count = 3, Total = 495, Avg = 165, Budget = 5/500

// // - Same filtering capabilities
// console.log(budgetManager.filterByDateRange(sixDaysAgo, today).map(e => e.category)); // [Entertainment, Food] 
// console.log(budgetManager.filterByCategory('Food').map(e => e.category)); // [ Food ]

// Can't go over budget
addExpense(budgetManager, 10, today, 'Health'); // Expense was not added: Budget exceeded!
console.log(budgetManager.remainingBudget);    // 5
// Zeroing out
addExpense(budgetManager, 5, today, 'Health'); // Expense successfully added. #4
console.log(budgetManager.remainingBudget);   // 0

// // Removing expenses restores budget
// budgetManager.removeExpense(4);
// console.log(budgetManager.remainingBudget);   // 5