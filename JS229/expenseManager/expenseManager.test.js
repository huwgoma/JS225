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

