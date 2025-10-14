// Use Chrome Snippets for this assignment.

// 1) What does `this` reference in the following code?
// function whatIsMyContext() {
//   return this;
// }

// A: The answer cannot be determined from the given code, since
//    the value of `this` depends on how a function is invoked - not
//    where it's defined.


// 2) What does `this` reference in the following code?
// function whatIsMyContext() {
//   return this;
// }

// whatIsMyContext();

// A: `this` will reference the global object, `window`, since the
//    function is invoked as a standalone (ie. without an explicit
//    receiver).



// 3) What does `this` reference?
// function foo() {
//   function bar() {
//     function baz() {
//       console.log(this);
//     }

//     baz();
//   }

//   bar();
// }

// foo();

// A: `this` will reference the global object `window`, since the `baz`
//    function is invoked as a standalone, without an explicit receiver.



// 4) What does `this` reference?
// let obj = {
//   count: 2,
//   method() {
//     return this.count;
//   },
// };

// obj.method();

// A: `this` references the receiver of the `method` method call, `obj`.



// 5) What does the following program output in strict mode?
// "use strict";

// function foo() {
//   console.log(this.a);
// }

// let a = 2;
// foo();

// A: This code will raise a `TypeError` on Line 2 (cannot read property
//    'a' from undefined). 
// -- In strict mode, the implicit context for function invocations is
//    undefined; therefore, attempting to access the nonexistent `a` 
//    property from `undefined` will raise a TypeError.



// 6) What does the following program output?
// let a = 1;
// function bar() {
//   console.log(this.a);
// }

// let obj = {
//   a: 2,
//   foo: bar,
// };

// obj.foo();

// A: This code will output 2.
// -- When `obj.foo` is invoked, `this` is set to the receiving object,
//    `obj`. Therefore, accessing `this.a` within the `foo` method will
//    evaluate to `obj.a`, which is 2.



// 7) What does the following program output?
let foo = {
  a: 1,
  bar() {
    console.log(this.baz());
  },

  baz() {
    return this;
  },
};

foo.bar(); // Logs the foo object { a: 1, bar: [Function], baz: [Function] }
let qux = foo.bar;
qux();     // Raises a TypeError (baz is not a function) - because
           // `this` is global, `this.baz` is undefined, and undefined
           // cannot be invoked as a function.

// A: This code will log the `foo` object on Line 12, then raise a 
//    `TypeError` on Line 14.
// -- With regular functions and methods, the value of `this` is 
//    determined entirely at runtime.
//    - Therefore, the value of `this` during the `foo.bar()` 
//      invocation is the receiving object, `foo`. The return value of
//      `foo.baz()` is simply the value of `this`, which is again 
//      `foo` (since `baz` is invoked on `foo` through `this`).
//    - Conversely, on Line 14, the `qux` function (extracted from
//      `foo.bar` on Line 13) is invoked as a standalone function, which
//      sets `this` to the global object (in sloppy mode). Therefore, 
//      `this.baz` will return `undefined`, and attempting to invoke
//      `undefined` as a function will raise a TypeError.