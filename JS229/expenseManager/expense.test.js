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
  expect(() => new Expense(13, today, 'Food')).toThrow(Error);
  expect(() => new Expense(1, today, 'Food') ).toThrow(Error);
  expect(() => new Expense(1, 13, 'Food')    ).toThrow(Error);
  expect(() => new Expense(1, 13, today)     ).toThrow(Error);
});

// > Invalid Dates
test('expense date must be a date', () => {
  expect(() => new Expense(1, 13, 'not a date', 'Food')).toThrow(Error);
});

test('expense date cannot be in the future', () => {
  expect(() => new Expense(1, 13, tomorrow, 'Food')).toThrow(Error);
});

// > Invalid Amounts
test('expense amount must be a number', () => {
  expect(() => new Expense(1, 'not a number', today, 'Food')).toThrow(Error);
});

test('expense amount must be positive', () => {
  expect(() => new Expense(1, -13, today, 'Food')).toThrow(Error);
  expect(() => new Expense(1, 0, today, 'Food')).toThrow(Error);
});

// > Invalid Categories
test('expense category must be a string', () => {
  expect(() => new Expense(1, 13, today, false)).toThrow(Error);
});

test('expense category cannot be empty', () => {
  expect(() => new Expense(1, 13, today, '')).toThrow(Error);
});
