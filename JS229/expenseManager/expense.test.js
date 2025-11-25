const Expense = require('./expense');

const today = new Date();
today.setHours(0, 0, 0, 0);

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

test('valid expense has id/amount/date/category', () => {
  let chipotle = new Expense(1, 13, today, 'Food');

  expect(chipotle.id).toBe(1);
  expect(chipotle.amount).toBe(13);
  expect(chipotle.date).toBe(today);
  expect(chipotle.category).toBe('Food');
});

test('expenses cannot be altered', () => {
  let chipotle = new Expense(1, 13, today, 'Food');
  
  chipotle.id = 10;
  chipotle.amount = 130;
  chipotle.date = yesterday;
  chipotle.category = 'Not Food';

  expect(chipotle.id).toBe(1);
  expect(chipotle.amount).toBe(13);
  expect(chipotle.date).toBe(today);
  expect(chipotle.category).toBe('Food');
});