const Expense = require('./expense');

test('valid expense has id/amount/date/category', () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let chipotle = new Expense(1, 13, today, 'Food');

  expect(chipotle.id).toBe(1);
  expect(chipotle.amount).toBe(13);
  expect(chipotle.date).toBe(today);
  expect(chipotle.category).toBe('Food');
});