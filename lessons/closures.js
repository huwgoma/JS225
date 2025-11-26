// 1) Create a `makeCounterLogger` function that takes a number as 
//    an argument and returns a function.
// -- When we invoke the returned function with a second number,
//    it should count from the first number to the second number,
//    logging each number to the console.

// Algorithm (Inner):
// - Given two numbers as input, `from` and `to`:
// ** If from === to log from and then return

// 1) Calculate the step direction (up/down)
// 2) Initialize a current/working number, starting from `from`:
// 3) Log the current number
// 4) Increment current number by step direction
// 5) Continue until current number 'exceeds' the to number
//  ** exceeds => out-of-range, not necessarily 'greater than'
//  >> to + step direction
//  If stepping down (5->2), exit number is 2 + (-1) => 1
//  If stepping up (5->8), exit number is 8 + 1 => 9

// function makeCounterLogger(from) {
//   return function(to) {
//     if (from === to) { return console.log(from) };

//     let stepDirection = (to - from) / Math.abs(to - from);
//     let currentNum    = from;
//     let limit         = to + stepDirection;

//     while (currentNum !== limit) {
//       console.log(currentNum);
//       currentNum += stepDirection;
//     }
//   };
// }

// // Output:
// let countlog = makeCounterLogger(5);
// countlog(8);
// // 5
// // 6
// // 7
// // 8
// countlog(2);
// // 5
// // 4
// // 3
// // 2
// countlog(5);
// // 5




// 2) Write a `makeList` funcion that returns a new function with the
//    following behavior:
// a) When called with an argument that is not in the 'list', add 
//    argument to list
// b) When called with an argument that is in the list, remove argument
//    from list
// c) When called without arguments, log all items on the list, or an
//    empty message if the list is empty.

// function makeList() {
//   let list = new Set;

//   const logItems = () => {
//     if (list.size === 0) {
//       console.log('The list is empty.');
//     } else {
//       list.forEach(item => console.log(item));
//     }
//   };

//   return function(listItem) {
//     if (arguments.length === 0) { return logItems() };

//     if (list.has(listItem)) {
//       list.delete(listItem);
//       console.log(`${listItem} removed!`);
//     } else {
//       list.add(listItem);
//       console.log(`${listItem} added!`);
//     }
//   };
// }

// let list = makeList();
// list();
// // The list is empty.
// list('make breakfast');
// // make breakfast added!
// list('read book');
// // read book added!
// list();
// // make breakfast
// // read book
// list('make breakfast');
// // make breakfast removed!
// list();
// // read book



// =================== Closures =====================

// 1) Write a function `makeMultipleLister` that, when invoked with a
//    number, returns a function that logs every positive integer 
//    multiple of that number that is less than 100.

// function makeMultipleLister(multiple) {
//   return function() {
//     let currentNum = multiple;

//     while (currentNum < 100) {
//       console.log(currentNum);
//       currentNum += multiple;
//     }
//   };
// }

// let lister = makeMultipleLister(13);
// lister();
// // 13
// // 26
// // 39
// // 52
// // 65
// // 78
// // 91



// 2) Write a program that uses two functions (add and subtract) to
//    manipulate a running total value. 
// -- When either function is invoked with a number, it should add or
//    subtract that number from the running total and log the new total
//    to the console.

// let total = 0;

// const add      = (num) => console.log(total += num);
// const subtract = (num) => console.log(total -= num);

// add(1);
// // 1
// add(42);
// // 43
// subtract(39);
// // 4
// add(6);
// // 10


// 2b) Refactor the above to make the `total` variable private from the
//     global scope.
// function createMathOperators() {
//   let total = 0;

//   return {
//     add:      (num) => console.log(total += num),
//     subtract: (num) => console.log(total -= num),
//   };
// }

// let { add, subtract } = createMathOperators();

// add(1);
// // 1
// add(42);
// // 43
// subtract(39);
// // 4
// add(6);
// // 10



// 3) Is there a way to set the value of systemStatus to the value of
//    the inner variable status without modifying startup? If so, how?

// function startup() {
//   let status = 'ready';
//   return function() {
//     console.log('The system is ready.');
//   };
// }

// let ready = startup();
// // let systemStatus = // ?

// A: I do not believe there is a way to set `systemStatus = status`
//    without modifying `startup`; since `status` is encapsulated within
//    the closure of the function returned from `startup`, it can only
//    be accessed by that function and `startup` itself.