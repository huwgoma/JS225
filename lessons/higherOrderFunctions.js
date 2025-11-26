// 1) What are the characteristics that define higher-order
//    functions?
// A: A higher-order function is a term used to describe a function
//    that either accepts another function as input, returns another
//    function as output, or both.



// 2) Which function in the following code is a higher-order
//    function, and why?
// let numbers = [1, 2, 3, 4];
// function checkEven(number) {
//   return number % 2 === 0;
// }

// numbers.filter(checkEven); // [2, 4]

// The `filter` function is considered higher-order, because it
// takes another function as input (`checkEven`) and invokes it
// as part of producing its output.



// 3) Implement `makeCheckEven` below such that the last line of
//    code returns an array [2, 4]:
// let numbers = [1, 2, 3, 4];
// function makeCheckEven() {
//   return function(number) {
//     return number % 2 === 0;
//   }
// }

// let checkEven = makeCheckEven();

// console.log(numbers.filter(checkEven)); // [2, 4]



// 4) Implement `execute` below such that the return values for 
//    the two function invocations match the desired values
// function execute(func, operand) {
//   return func(operand);
//   // ... implement this function
// }

// console.log(execute(function(number) {
//   return number * 2;
// }, 10)); // 20

// console.log(execute(function(string) {
//   return string.toUpperCase();
// }, 'hey there buddy')); // "HEY THERE BUDDY"



// 5) Implement `makeListTransformer` so that `timesTwo`'s return
//    value matches the commented return value.
// function makeListTransformer(func) {
//   return function(list) {
//     return list.map(func);
//   }
// }

// let timesTwo = makeListTransformer(function(number) {
//   return number * 2;
// });

// console.log(timesTwo([1, 2, 3, 4])); // [2, 4, 6, 8]