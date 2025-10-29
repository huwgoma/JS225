// 4) What will the following code log, and why?
// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());

// A: This code will log `true` on Line 12.
// -- When `swingSword` is called on `ninja`, JavaScript first searches
//    the `ninja` object itself for a matching method; not finding one,
//    it searches its `[[Prototype]]` object, which is `Ninja.prototype`.
// -- Even though `swingSword` is defined on `Ninja.prototype` after
//    the instantiation of `ninja`, all instances of `Ninja` maintain
//    live references to `Ninja.prototype` via their object prototype;
//    therefore, `ninja` is able to access `swingSword` from its 
//    prototype during JavaScript's object property lookup.



// 5) What will the following code log, and why?
// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

// A: This code will raise a TypeError (ninja.swingSword is not a 
//    function).
// -- In contrast to the previous problem, this snippet does not 
//    mutate the existing Ninja.prototype object by adding a method;
//    rather, it replaces it entirely with a new object. Any existing
//    instances will continue to reference the old Ninja.prototype
//    from their `[[Prototype]]` property, which does not have a 
//    swingSword method. Therefore, accessing `ninja.swingSword` 
//    returns `undefined`, which subsequently raises a TypeError when
//    invoked.



// 6) Implement the method below:
// let ninjaA;
// let ninjaB;
// function Ninja() {
//   this.swung = false;
// }

// ninjaA = new Ninja();
// ninjaB = new Ninja();

// // Add a swing method to the Ninja prototype which
// // returns the calling object and modifies swung
// Ninja.prototype.swing = function() {
//   this.swung = true;
//   return this;
// }

// console.log(ninjaA.swing().swung);      // must log true
// console.log(ninjaB.swing().swung);      // must log true



// 7) Create a ninjaB object without having direct access to the
//    Ninja constructor:
// let ninjaA = (function() {
//   function Ninja(){};
//   return new Ninja();
// })();

// // create a ninjaB object
// let ninjaB = new ninjaA.constructor();

// console.log(ninjaB.constructor === ninjaA.constructor);    // should log true

// // Notes:
// // - Ninja A is the return value of an IIFE:
// // - The function, when invoked, returns a new Ninja object
// //   from the nested Ninja constructor
// // - Because Ninja is function-scoped, it is hidden from external access
// // - To reach the Ninja constructor from ninjaA:
// // - ninjaA.constructor - then instantiate (new)