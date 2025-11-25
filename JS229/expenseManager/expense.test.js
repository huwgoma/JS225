const Expense = require('./expense');

// Date-Related Helpers
const today = new Date();
today.setHours(0, 0, 0, 0);

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const sameDay = function(dateA, dateB) {
  return dateA.getTime() === dateB.getTime();
}

// Expense Tests
test('valid expense has id/amount/date/category', () => {
  let chipotle = new Expense(1, 13, today, 'Food');

  expect(chipotle.id).toBe(1);
  expect(chipotle.amount).toBe(13);
  expect(sameDay(chipotle.date, today)).toBe(true);
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
  expect(sameDay(chipotle.date, today)).toBe(true);  
  expect(chipotle.category).toBe('Food');
});

// Invalid => Error Object 
test('expenses must have all fields', () => {
  let chipotleMissingCategory1 = new Expense(13, today, 'Food');
  let chipotleMissingCategory2 = new Expense(1, today, 'Food');
  let chipotleMissingCategory3 = new Expense(1, 13, 'Food');
  let chipotleMissingCategory4 = new Expense(1, 13, today);
  
  expect(chipotleMissingCategory1.invalid).toBe(true);
  expect(chipotleMissingCategory2.invalid).toBe(true);
  expect(chipotleMissingCategory3.invalid).toBe(true);
  expect(chipotleMissingCategory4.invalid).toBe(true);
});

test('expense date cannot be in the future', () => {
  let chipotleFromTheFuture = new Expense(1, 13, tomorrow, 'Food');

  expect(chipotleFromTheFuture.invalid).toBe(true);
});