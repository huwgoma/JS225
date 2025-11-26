// Use Chrome Snippets for these problems.

// 1) What will the following code output?
// function foo() {
//   return this;
// }

// let context = foo();
// console.log(context);

// A: This code will output the `window` object. 
// -- The return value of `foo()` is the value of `this`; since `foo` is invoked
//    as a standalone function, and this code operates in sloppy mode, `this` is
//    assigned to the global object, which is `window` in console.



// 2) What will the following code output?
// "use strict";

// function foo() {
//   return this;
// }

// let context = foo();
// console.log(context);

// A: This code will now output `undefined`. Strict mode changes the implicit value
//    of `this` within standalone function calls from the global object to `undefined`.




// 3) What will the code below output? Why is the output here different from the
//    the output in problem 1?
// let obj = {
//   foo() {
//     return this;
//   },
// };

// let context = obj.foo();

// console.log(context);

// A: This code will output the `obj` object, which should resemble something like
//    `{ foo: [Function: foo] }`. 
// -- The main reason for the difference in output compared to Problem 1 is that
//    `foo` is invoked as a method here, with `obj` as the receiver; when a function
//    is invoked as a method with an explicit receiver, JavaScript implicitly sets
//    the value of `this` to the receiving object, which is the `obj` object in 
//    this example.



// 4) What will the following code output? Why?
// var message = 'Hello from the global scope!';

// function deliverMessage() {
//   console.log(this.message);
// }

// deliverMessage();

// let bar = {
//   message: 'Hello from the function scope!',
// };

// bar.deliverMessage = deliverMessage;

// bar.deliverMessage();


// A: This code will output `'Hello from the global scope!'` on Line 7, and 
//    `'Hello from the function scope!'` on Line 15.
// -- Assuming this code is running in the console, the `message` variable declared
//    on Line 1 will be created as a property on the global `window` object, since
//    it is a `var` variable without any encompassing function body. Therefore,
//    when `deliverMessage` is invoked as a standalone function on Line 7, `this`
//    references the global object, and `this.message` returns the value assigned
//    to `message` on Line 1.
//    - On Lines 9-11, we create a `bar` object with a `message` property; next, 
//      Line 13 creates a new `deliverMessage` property on `bar` and assigns it to
//      the function object `deliverMessage`.
//    - On Line 15, `deliverMessage` is invoked as a method, with `bar` as the 
//      receiver; therefore, `this` is set to the `bar` object, and `this.message`
//      returns `bar`'s `message` property.



// 5) What will the following code output? Why?
//    What would happen if we replace `var` on Line 1 with `let`?
//    Explain why the output would change.
// var a = 10;
// let b = 10;
// let c = {
//   a: -10,
//   b: -10,
// };

// function add() {
//   return this.a + b;
// }

// c.add = add;

// console.log(add());   // 20
// console.log(c.add()); // 0


// A: As it currently is, this code will output 20 on Line 14 and 0 on Line 15.

// On Line 14, `add` is invoked as a standalone function, meaning `this` is set to
// the global `window` object (since strict mode is not enabled). Therefore, `this.a`
// will return `10`- since the `a` variable was declared with `var` outside of any
// function body, it is created as a property on the global object - and `b` will
// reference the outer-scoped `b` variable declared on Line 2 (`10`), resulting in
// an output of `20`.

// On Line 15, `add` is invoked as a method on the `c` object, meaning `this` is 
// set to the `c` object defined on Lines 3-6. Therefore, `this.a` will return `-10`,
// while `b` will still reference the same outer-scoped `b` variable, since it is 
// resolved as a variable and not as an object property, resulting in an output
// of `0`.

// If Line 1 were to be replaced with `let a = 10`, the output from Line 14 should
// change to `NaN`. This is because variables declared with `let` are not added as
// a global object property, so `this.a` (when `this === window`) returns `undefined`,
// leading to a sum of `undefined + 10 => NaN`.



// 6) What methods can be used to explicitly specify a function's execution context?
// A: Function.prototype.call and Function.prototype.apply



// 7) What will the following code return?
// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = {
//    a: 'abc',
//    b: 'def',
//    add() {
//      return this.a + this.b;
//    },
// };

// bar.add.call(foo); //=> 1 + 2 => 3

// A: This will return 3. When we invoke `call` on `bar.add`, we are essentially
// invoking `bar`'s `add` method and manually setting `this` to the first given
// object argument (`foo`); functionally, it would be as though we had defined
// `add` on `foo` and called `foo.add`. Therefore, `this.a` and `this.b` returns 
// `foo`'s `a` and `b` properties, resulting in a sum of `3`.



// 8) Modify the code below using #call or #apply to produce the desired output.
// -- Explain your reasoning for the method of choice.
let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

outputList.call(fruitsObj, ...fruitsObj.list) // call
outputList.apply(fruitsObj, fruitsObj.list)   // apply

// invoke outputList here

// Output: 
// A Collection of Fruit:
// Apple
// Banana
// Grapefruit
// Pineapple
// Orange


// Analysis:
// `let args = [].slice.call(arguments)`

// Knowns:
// `arguments` collects all given arguments into an Array-like structure. For 
// example, if given the array `[1, 2, 3]` as argument, Arguments would look like 
// `[Arguments] { '0': [ 1, 2, 3 ] }`. 

// `[].slice` returns the `Slice` function object from `Array.prototype`. Combined
// with `call`, this presumably changes `this` from `Array.prototype` to `arguments`;
// functionally, it should be equivalent to `arguments.slice()`, if `arguments` had
// a `slice` method.

// ** Assume for now that `[].slice.call(arguments)` behaves the way I think it 
//    does (ie. as functionally equivalent to `arguments.slice()`).

// The next thing the function does is iterate over `args` with `forEach` and log
// each element. Since `arguments` collects all given arguments into an array-like,
// we would probably want the arguments to be passed in 1-by-1. 

// - We could achieve this with either `call` or `apply` on `outputList`, setting
//   the context to `fruitsObj` (which would allow `this.title` to correctly return
//   `'A Collection of Fruit'`).
// >> `call` expects a comma-separated list of arguments; therefore, we would have
//    to spread each element from `fruitsObj.list` using the `...` operator.
// >> `apply` expects an array of arguments; therefore, we could just pass the
//    `fruitsObj.list` array as-is, and `apply` would handle passing each element
//    to the `outputList` function.



// 9) Consider this line of code:
// let args = [].slice.call(arguments);

// arguments is an object that holds all arguments passed to the function.
// - Why do you think the author of the function is using `call` here?

// A: The goal of this line is to convert the `arguments` object into a real 
//    Array, so that `forEach` will work correctly later.
// -- The purpose of `call` in this code is to 'borrow' the `Array.prototype.slice`
//    method, invoking it on the `arguments` object instead (which does not have its
//    own built-in slice method).