const ExpenseManager = require('./expenseManager');

const today = new Date();
today.setHours(0, 0, 0, 0);

const logSpy = jest.spyOn(console, 'log');

// Adding Expenses
test('successfully adding expense', () => {
  let expenseManager = new ExpenseManager();

  expenseManager.addExpense(13, today, 'Food');
  expect(logSpy).toHaveBeenCalledWith('Successfully added expense!');
});

test('adding expenses fails if category is unknown', () => {
  let expenseManager = new ExpenseManager();

  expenseManager.addExpense(13, today, 'bad category')
  expect(logSpy).toHaveBeenCalledWith('Invalid expense category.');
});


// Summarizing Expenses
test('summarize() logs correct outputs', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, today, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  expenseManager.logSummary();

  expect(logSpy).toHaveBeenCalledWith('Number of Expenses:  3');
  expect(logSpy).toHaveBeenCalledWith('Total Spent:        $58.00');
  expect(logSpy).toHaveBeenCalledWith('Average Expense:    $19.33');

});


// Removing Expenses
test('removing a nonexistent expense', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, today, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  expenseManager.removeExpense(67);

  expect(logSpy).toHaveBeenCalledWith('That expense (id = 67) could not be found.');
  expect(expenseManager.expenses.length).toBe(3);
});

test('removing an existing expense', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, today, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  expenseManager.removeExpense(1);

  expect(logSpy).toHaveBeenCalledWith('Expense #1 successfully removed.');
  expect(expenseManager.expenses.length).toBe(2);
  expect(expenseManager.expenses[0].amount).toBe(30);
});


// Filtering Expenses
// > By Date
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);

test('filtering returns the expenses within the given dates', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, lastWeek, 'Health');
  expenseManager.addExpense(15, lastWeek, 'Entertainment');

  let expenses = expenseManager.filterByDateRange(yesterday, today); // [Expense(1, 13, today, 'Food')]
  expect(expenses.length).toBe(1);
  expect(expenses[0].category).toBe('Food');
});

test('filtering correctly returns expenses at date range boundaries', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, lastWeek, 'Health');
  expenseManager.addExpense(15, lastWeek, 'Entertainment');

  let expenses = expenseManager.filterByDateRange(lastWeek, today);
  expect(expenses.length).toBe(3);
});

test('filtering with irrelevant dates returns empty array', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, lastWeek, 'Food');
  expenseManager.addExpense(30, lastWeek, 'Health');
  expenseManager.addExpense(15, lastWeek, 'Entertainment');

  let expenses = expenseManager.filterByDateRange(yesterday, today);
  expect(expenses.length).toBe(0);
});

test('filtering with identical arguments returns expenses from that day', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, lastWeek, 'Food');
  expenseManager.addExpense(30, lastWeek, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  // Filters out Entertainment expense from today
  let expenses = expenseManager.filterByDateRange(lastWeek, lastWeek); 
  expect(expenses.length).toBe(2);
  expect(expenses.filter(e => e.category === 'Entertainment').length).toBe(0);
});

// > By Category
test('filtering by category correctly excludes unrelated expenses', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, lastWeek, 'Food');
  expenseManager.addExpense(30, yesterday, 'Food');
  expenseManager.addExpense(15, today, 'Entertainment');

  let expenses = expenseManager.filterByCategory('Food');
  expect(expenses.length).toBe(2);
  expect(expenses.every(e => e.category === 'Food')).toBe(true);
});

test('filtering for an unregistered category returns empty array', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, lastWeek, 'Food');
  expenseManager.addExpense(30, yesterday, 'Food');
  expenseManager.addExpense(15, today, 'Entertainment');

  let expenses = expenseManager.filterByCategory('???');
  expect(expenses.length).toBe(0);
});


// Retrieving list of categories
test('correctly returns (a copy of) the categories array', () => {
  let expenseManager = new ExpenseManager();

  let categories = expenseManager.categories;

  expect(categories.length).toBe(5); // Default 5
});

test('cannot mutate categories directly via getter', () => {
  let expenseManager = new ExpenseManager();

  let categories = expenseManager.categories;
  categories.push('New Category!');
  categories = expenseManager.categories;
  expect(categories.length).toBe(5); // Still only the default 5
});


// Adding categories
