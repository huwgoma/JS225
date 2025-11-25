const BudgetExpenseManager = require('./budgetExpenseManager');

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