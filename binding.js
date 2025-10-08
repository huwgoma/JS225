// Hard Binding Functions with Contexts

// 1) What method can be used to permanently bind a function to a particular 
//    execution context?
// A: `Function.prototype.bind`


// 2) What will the following code log?
// let obj = {
//   message: 'JavaScript',
// };

// function foo() {
//   console.log(this.message);
// }

// foo.bind(obj);

// A: This code will not log anything, because `bind` does not actually invoke 
//    the function - it only returns a copy of the calling function with a different
//    value for `this`.
// -- If we were to invoke the function, it would output `'JavaScript'`, since the
//    given context object `obj` would be set as the function's `this` value.


// 3) What will the code below output?
// let obj = {
//   a: 2,
//   b: 3,
// };

// function foo() {
//   return this.a + this.b;
// }

// let bar = foo.bind(obj);

// console.log(bar());

// A: This code will output 5; the `bar` function created on Line 10 is a copy of
// `foo`, with a `this` value of `obj`. Therefore, `this.a` and `this.b` will return
// 2 and 3 respectively when `bar` is invoked, resulting in a sum of 5. 



// 4) What will the code below output?
// let positiveMentality = {
//   message: 'JavaScript makes sense!',
// };

// let negativeMentality = {
//   message: 'JavaScript makes no sense!',
// };

// function foo() {
//   console.log(this.message);
// }

// let bar = foo.bind(positiveMentality);

// negativeMentality.logMessage = bar;
// negativeMentality.logMessage();

// A: This code will output `'JavaScript makes sense!'`.
// -- The underlying concept demonstrated by this code is that `bind` creates a 
//    a permanent binding between the returned function and the given context 
//    object.
// -- Even if the bound function is invoked using `call` or `apply` with a different
//    context, or if it is added to and invoked on another object, the `this` value
//    remains unchanged.
  

// 5) What will the code below output?
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);

// A: This code will output `'Amazebulous!'`. The underlying concept demonstrated
//    in this code is that again, `bind` creates a permanent binding between the
//    copied function and the given context object. Even if the function is called
//    with another explicit context object, such as `otherObj`, the value of `this`
//    will always remain unchanged.