// 1) Will the following code execute? Why or why not?
// function() {
//   console.log("Sometimes, syntax isn't intuitive!")
// }();

// A: This code will not execute, because the function is defined
//    as a function declaration, which is a statement and not an 
//    expression. Therefore, the function declaration will not return
//    any value that we can 'chain' the invocation `()` onto, so a
//    SyntaxError will be raised.



// 2) Edit the code from the first problem to run without error.

// (function() {
//   console.log("Sometimes, syntax isn't intuitive!")
// })();

// By wrapping the function definition in parentheses, it becomes a 
// function expression, which *does* return a value (the function
// object) that we can chain onto.



// 3) The code below throws an error. Why? Fix the code so it runs.

// var sum = 0;
// var numbers;

// sum += 10;
// sum += 31;

// numbers = [1, 7, -3, 3];

// function sum(arr) {
//   return arr.reduce(function(sum, number) {
//     sum += number;
//     return sum;
//   }, 0);
// }

// sum += sum(numbers);  // ?

// A: The code below will raise a TypeError - `sum is not a function`
//    - due to how hoisting works. The `sum` function is hoisted and
//    fully defined before runtime; however, during runtime, the global
//    `sum` variable is reassigned 3 times, on Lines 1, 4, and 5, with
//    its final value being 41.
// -- Thus, when we get to Line 16, the full expression evaluates to
//    `sum = sum + sum(numbers)` - but because `sum` references 41, it
//    cannot be invoked as a function, and a TypeError is thrown.
// -- Fundamentally, this is a namespace collision error - we have two
//    different values that we want `sum` to represent (a function and
//    a value).
// -- To fix this, we can refactor the `sum` function into an IIFE, 
//    thus eliminating one of the `sum`s from the global namespace:

// var sum = 0;
// var numbers;

// sum += 10;
// sum += 31;

// numbers = [1, 7, -3, 3];

// sum += (function sum(arr) {
//   return arr.reduce(function(sum, number) {
//     sum += number;
//     return sum;
//   }, 0);
// })(numbers);

// console.log(sum); // should be 49



// 4) Implement a countdown function that generates the desired output
//    using an IIFE:

// function countdown(start) {
//   let decreaseCount = function() {
//     let num = start;
//     return function() {
//       return num -= 1;
//     };
//   }();

//   let count = start;

//   while (count >= 0) {
//     console.log(count);
//     count = decreaseCount();
//   }
  
//   console.log('Done!');
// }

// 4b) Refactor so that `num = start` and `count = start` aren't 
//     repeated.

// function countdown(start) {
//   (function() {
//     let currentNum = start;
    
//     while (currentNum >= 0) {
//       console.log(currentNum);
//       currentNum -= 1;
//     };

//     console.log('Done!');
//   })();
// }

// countdown(7);
// // 7
// // 6
// // 5
// // 4
// // 3
// // 2
// // 1
// // 0
// // Done!



// 5) Is the named function `foo` in this IIFE accessible in the 
//    global scope?

// (function foo() {
//   console.log('Bar');
// })();

// foo() // ?

// A: The name `foo` is not accessible in the global scope - when a
//    function expression is named, the name is only accessible to the
//    function itself, not to any code outside of the function. 
//    Therefore, this code will raise a ReferenceError - `foo` is not
//    defined.



// 6) Refactor the solution to problem 4 using recursion.
// Hint: A named function in an IIFE can be referenced inside the IIFE.

// Iterative => Recursion:
// > Replace the loop with recursive calls
// - IIFE Function Definition (1): Defines a function that, when
//   invoked, counts down from start to 0

// // Counting Up
// function countdown(start) {
//   (function logUp(num) {
//     if (num < start) { logUp(num + 1) }

//     console.log(num);

//     if (num === 0) { console.log('Done!') }
//   })(0);
// }

// // Counting Down
// function countdown(start) {
//   (function logDown(num) {
//     // Base Case
//     if (num === 0) { 
//       console.log(num);
//       console.log('Done!');
//     } else {
//       console.log(num);
//       logDown(num - 1);
//     }
//   })(start);
// }

// countdown(7);