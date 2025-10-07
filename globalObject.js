// Run these examples in Chrome Snippets.

// 1) With strict mode OFF, what object serves as the implicit execution context?
// A: The `window` object.

// -- What about with strict mode ON?
// A: The `window` object is no longer used as the implicit execution context;
//    the context is set to `undefined` for standalone function calls without an
//    explicit receiver.


// 2) What does the code below log?
// a = 10;

// console.log(window.a === a);

// A: This will log true, because undeclared variables (`a`) are actually created
//    as a property on the global object (which, in sloppy mode, is `window`).


// 3) What does the code below log? Why?
// "use strict"

// a = 10;

// console.log(window.a === a);

// A: This will raise an error on the line `a = 10`, because strict mode prevents 
//    undeclared variables from being assigned.


// 4) What does the following code output? Why?
// function func() {
//   let b = 1;
// }

// func();

// console.log(b);

// A: This code will raise a ReferenceError on the last line (`console.log(b)`), 
//    `b is not defined`. This is because the `b` variable initialized within the
//    `func` function is declared with `let`, and is therefore scoped locally to 
//    the function body and destroyed when the function finishes executing.


// 5) What does the following code output? Why?
// function func() {
//   b = 1;
// }

// func();

// console.log(b);

// A: This code will output `1`. The key difference in this snippet is that the 
//    `b` variable is initialized without a declaration; since strict mode is not
//    enabled, JavaScript will create the undeclared `b` variable as a property on
//    the global object, thus making it accessible on the last line, even after the
//    function finishes executing.


// 6) What does the following code log? Why?
// "use strict"

// function func() {
//   b = 1;
// }

// func();

// console.log(b);

// A: This code will raise a `ReferenceError (b is not defined)` on Line 4.
//    As seen previously, strict mode prevents the usage of undeclared variables,
//    so `b = 1` on Line 4 will raise an error.

// -- In strict mode, the implicit execution context (for unanchored function calls)
//    is set to `undefined`, instead of the global object.
// -- Therefore, when JavaScript encounters the undeclared variable `b`:
//    1) It first searches lexically for a `b` variable that it can use.
//    2) Since no such variable exists, it would normally attempt to create `b` 
//       as a property on the global variable. However, because strict mode prevents
//       this, this step is skipped.
//    3) Therefore, a `ReferenceError` is raised, since there is no `b` variable
//       in scope.
