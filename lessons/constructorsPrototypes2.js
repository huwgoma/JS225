// 1) Implement the following requirements: 
// a) Create a shape object with a getType method.
// b) Define a Triangle constructor with an object prototype of shape.
//    - Triangle objects should have 4 self-defined properties:
//      a, b, c (sides), and type.
// c) Add a getPerimeter method to the prototype (shape).

// let shape = { 
//   getType() { return this.type },
// }

// function Triangle(a, b, c) {
//   this.a = a;
//   this.b = b;
//   this.c = c;
//   this.type = 'triangle';
// }

// Triangle.prototype = shape;
// Triangle.prototype.constructor = Triangle;
// Triangle.prototype.getPerimeter = function() {
//   return this.a + this.b + this.c;
// }

// // Usage
// let t = new Triangle(3, 4, 5);
// console.log(t.constructor);                 // Triangle(a, b, c)
// console.log(shape.isPrototypeOf(t));        // true
// console.log(t.getPerimeter());              // 12
// console.log(t.getType());                   // "triangle"



// 2) Update the following code so that each statement logs the 
//    name of the constructor to which it belongs.
// console.log("Hello".constructor.name);           // String
// console.log([1,2,3].constructor.name);           // Array
// console.log({name: 'Srdjan'}.constructor.name);  // Object



// 3) Write a constructor function that can be used with or without
//    the new operator, and will return the same result in either form.

// function User(first, last) {
//   // instanceof - Returns true if the given constructor's .prototype
//   // appears anywhere in the given object's [[Prototype]] chain
//   let self = this instanceof User ? this : Object.create(User.prototype);

//   self.name = `${first} ${last}`;

//   return self;
// }

// // Recursive Solution:
// function User(first, last) {
//   if (!(this instanceof User)) { return new User(first, last) };

//   this.name = `${first} ${last}`;
// }

// let name = 'Jane Doe';
// let user1 = new User('John', 'Doe');
// let user2 = User('John', 'Doe');

// console.log(name);         // => Jane Doe
// console.log(user1.name);   // => John Doe
// console.log(user2.name);   // => John Doe



// 4) Create a function that creates and returns an object with a 
//    given object as its prototype. Do not use Object.create.

// function createObject(obj) {
//   let newObj = {};
//   Object.setPrototypeOf(newObj, obj);

//   return newObj;
// }

// // Solution without using setPrototypeOf:
// function createObject(obj) {
//   function F() {};
//   F.prototype = obj;

//   return new F();
// }

// let foo = {
//   a: 1
// };

// let bar = createObject(foo);
// console.log(foo.isPrototypeOf(bar));         // true



// 5) Without using Object.create, create a begetObject method that 
//    can be called on any object to create and return an object
//    inherited from the given object.

// Object.prototype.begetObject = function() {
//   function F() {};
//   F.prototype = this;

//   return new F();
// }


// let foo = {
//   a: 1,
// };

// let bar = foo.begetObject();
// console.log(foo.isPrototypeOf(bar));         // true



// 6) Create a neww function that works like the new operator.

function neww(constructor, args) {
  let newInstance = Object.create(constructor.prototype);
  let returnValue = constructor.apply(newInstance, args);

  return returnValue instanceof Object ? returnValue : newInstance;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();               // => Hello, John Doe
console.log(john.constructor); // Person(firstName, lastName) {...}