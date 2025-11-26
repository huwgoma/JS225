const ExpenseManager = require('./expenseManager');

const today = new Date();
today.setHours(0, 0, 0, 0);

const logSpy = jest.spyOn(console, 'log');

// Adding Expenses
test('successfully adding expense', () => {
  let expenseManager = new ExpenseManager();

  expenseManager.addExpense(13, today, 'Food');
  expect(expenseManager.expenses.length === 1);
});

test('adding expenses fails if category is unknown', () => {
  let expenseManager = new ExpenseManager();

  expect(() => expenseManager.addExpense(13, today, 'bad category')).toThrow(Error);
});


// Summarizing Expenses
test('summarize() logs correct outputs', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, today, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  let summary = expenseManager.summary;

  expect(summary.count).toBe(3);
  expect(summary.total).toBe(58);
  expect(summary.average).toBe(19.33);
});


// Removing Expenses
test('removing a nonexistent expense', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, today, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  expenseManager.removeExpense(67);

  // expect(logSpy).toHaveBeenCalledWith('That expense (id = 67) could not be found.');
  expect(expenseManager.expenses.length).toBe(3);
});

test('removing an existing expense', () => {
  let expenseManager = new ExpenseManager();
  expenseManager.addExpense(13, today, 'Food');
  expenseManager.addExpense(30, today, 'Health');
  expenseManager.addExpense(15, today, 'Entertainment');

  expenseManager.removeExpense(1);

  // expect(logSpy).toHaveBeenCalledWith('Expense #1 successfully removed.');
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
let defaultCategories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health'];

test('correctly returns (a copy of) the categories array', () => {
  let expenseManager = new ExpenseManager();
  
  let categories = expenseManager.categories;

  expect(categories).toEqual(defaultCategories);
});

test('cannot mutate categories directly via getter', () => {
  let expenseManager = new ExpenseManager();

  let categories = expenseManager.categories;
  categories.push('New Category!');
  
  // Expense Manager's categories is unmodified
  expect(expenseManager.categories).toEqual(defaultCategories);
});


// Adding new categories
test('correctly adds a new category to categories', () => {
  let expenseManager = new ExpenseManager();
  
  let newCategory = 'Example';
  let expectedCategories = defaultCategories.slice().concat(newCategory);

  expenseManager.addCategory(newCategory);
  expect(expenseManager.categories).toEqual(expectedCategories);
});

test('expenses can be created in the new category', () => {
  let expenseManager = new ExpenseManager();

  expenseManager.addCategory('Example');
  let exampleExpense = expenseManager.addExpense(10, today, 'Example');

  expect(expenseManager.expenses).toEqual([exampleExpense]);
});

test('prevents duplicate categories from being added', () => {
  let expenseManager = new ExpenseManager();

  expenseManager.addCategory('Food');

  expect(logSpy).toHaveBeenCalledWith("Category 'Food' already exists.");
  expect(expenseManager.categories).toEqual(defaultCategories);
});

test('prevents empty/blank categories from being added', () => {
  let expenseManager = new ExpenseManager();

  expenseManager.addCategory(' ');

  expect(logSpy).toHaveBeenCalledWith('Category name cannot be empty.');
  expect(expenseManager.categories).toEqual(defaultCategories);
});
