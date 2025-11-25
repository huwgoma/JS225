const BudgetExpenseManager = require('./budgetExpenseManager');

const today = new Date();
today.setHours(0, 0, 0, 0);

const logSpy = jest.spyOn(console, 'log');

test('initializes with the specified budget limit', () => {
  let limit = 500;
  let budgetManager = new BudgetExpenseManager(limit);

  expect(budgetManager.remainingBudget).toBe(limit);
});

test('throws error if limit is not a valid positive number', () => {
  expect(() => new BudgetExpenseManager('abc')).toThrow(Error);
  expect(() => new BudgetExpenseManager(0)).toThrow(Error);
  expect(() => new BudgetExpenseManager(-123)).toThrow(Error);
  expect(() => new BudgetExpenseManager(NaN)).toThrow(Error);
});

// Log Summary
// > Logs everything from superclass, but also logs budget remaining / budget total
// - The specs state "Display how much of the budget has been used", but this is just 
//   functionally equivalent to the total amount field from expense manager's base summary.
test('logs remaining budget out of total', () => {
  let budgetManager = new BudgetExpenseManager(500);

  budgetManager.logSummary();
  expect(logSpy).toHaveBeenLastCalledWith('Budget Remaining:   $500.00/$500.00');
});


// Adding expenses
test('it subtracts the correct amount from remaining budget', () => {
  let budgetManager = new BudgetExpenseManager(500);

  budgetManager.addExpense(250, today, 'Entertainment');

  expect(budgetManager.remainingBudget).toBe(250);
});

test('it prevents adding an expense if too expensive', () => {
  let budgetManager = new BudgetExpenseManager(500);

  budgetManager.addExpense(501, today, 'Entertainment');

  expect(logSpy).toHaveBeenCalledWith('Budget exceeded! Cannot add expense.');
  expect(budgetManager.remainingBudget).toBe(500);
});

test('zeroing out is okay', () => {
  let budgetManager = new BudgetExpenseManager(500);

  budgetManager.addExpense(500, today, 'Entertainment');

  expect(budgetManager.remainingBudget).toBe(0);
});
