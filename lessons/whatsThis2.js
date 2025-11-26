// Run these examples in Chrome.

// 1) What does this reference in the following code?
//    What does it return?
// let myObject = {
//   count: 1,
//   myChildObject: {
//     myMethod() {
//       return this.count;
//     },
//   },
// };

// myObject.myChildObject.myMethod();

// A: `this` will reference `myChildObject`, since `myMethod` is 
//    invoked with `myChildObject` as its receiver.
//    - Because `myChildObject` does not have a `count` property,
//      `myMethod` will return `undefined`.



// 2) How would you change the context in problem 1 to `myObject`?
// A: We could call the `myMethod` method with an explicit context, 
//    using `call`:

// let myObject = {
//   count: 1,
//   myChildObject: {
//     myMethod() {
//       return this.count;
//     },
//   },
// };

// console.log(myObject.myChildObject.myMethod.call(myObject));



// 3) What does the following code log to the console?
// let person = {
//   firstName: 'Peter',
//   lastName: 'Parker',
//   fullName() {
//     console.log(this.firstName + ' ' + this.lastName +
//                 ' is the Amazing Spiderman!');
//   },
// };

// let whoIsSpiderman = person.fullName.bind(person);
// whoIsSpiderman();

// A: This code will output 'Peter Parker is the Amazing Spiderman!'.
// -- The `Function#bind` method returns a copy of the calling function
//    (`fullName`), with its context (ie. `this`) permanently bound to
//    the given context object - in this case, `person`.
// -- Therefore, regardless of how the `whoIsSpiderman` function is 
//    invoked, its context will always be the `person` object.



// 4) What does the following code output?

// let computer = {
//   price: 30000,
//   shipping: 2000,
//   total() {
//     let tax = 3000;
//     function specialDiscount() {
//       if (this.price > 20000) {
//         return 1000;
//       } else {
//         return 0;
//       }
//     }

//     return this.price + this.shipping + tax - specialDiscount();
//   }
// };

// console.log(computer.total());
// // 30000 + 2000 + 3000 - 0 => 35000

// A: This code will output `35000`, even though the (logically) expected
//    result should be `34000`.
// -- The key point of failure is in how the nested `specialDiscount`
//    function is invoked as a standalone; as a result, the value of
//    `this` within `specialDiscount` is the global object, `this.price`
//    is `undefined`, and `specialDiscount` will return 0 instead of 
//    1000.

// If we wanted this program to correctly log `34000`, we would need 
//  to implement a way for `specialDiscount` to preserve the context of
//  the `total` function. One way to do this is to use an arrow function
//  for `specialDiscount`, since arrow functions preserve the value
//  of `this` at the point where they are defined:

// let computer = {
//   price: 30000,
//   shipping: 2000,
//   total() {
//     let tax = 3000;
//     let specialDiscount = () => {
//       if (this.price > 20000) {
//         return 1000;
//       } else {
//         return 0;
//       }
//     }

//     return this.price + this.shipping + tax - specialDiscount();
//   }
// };

// console.log(computer.total()); // 34000