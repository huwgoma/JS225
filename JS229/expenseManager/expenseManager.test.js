const ExpenseManager = require('./expenseManager');

const today = new Date();
today.setHours(0, 0, 0, 0);

// Adding Expenses
test('adding expenses fails if category is unknown', () => {
  let expenseManager = new ExpenseManager();

  expect(() => expenseManager.addExpense(13, today, 'bad category')).toThrow(Error);
});

