function Person(firstName, lastName) {
  if (!lastName) {
    return 'Please provide a last name';
  }

  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function() {
    return (this.firstName + ' ' + this.lastName).trim();
  };
}

let noLastName = new Person('John');
console.log(noLastName);   // logs an instance of a Person object
console.log(noLastName instanceof Person); // => true



// // Classical
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   eat() {
//     console.log(`${this.name} is eating.`);
//   }
// }

// class Mammal extends Animal {
//   constructor(name, hasFur) {
//     super(name);
//     this.hasFur = hasFur;
//   }

//   sleep() {
//     console.log(`${this.name} is sleeping.`);
//   }
// }

// class Dog extends Mammal {
//   constructor(name, hasFur, breed) {
//     super(name, hasFur);
//     this.breed = breed;
//   }

//   bark() {
//     console.log(`${this.name} the ${this.breed} ` +
//                 'is barking.');
//   }
// }



// // Pseudo-Classical
// function Animal(name) {
//   this.name = name;
// }

// function Mammal(name, hasFur) {
//   Animal.call(this, name)
//   this.hasFur = hasFur;
// }

// function Dog(name, hasFur, breed) {
//   Mammal.call(this, name, hasFur);
//   this.breed = breed;
// }

// // Link Prototypes
// // - Constructor-Constructor 
// Object.setPrototypeOf(Mammal, Animal);
// Object.setPrototypeOf(Dog, Mammal);
// // - .prototype-.prototype
// Mammal.prototype = Object.create(Animal.prototype);
// Mammal.prototype.constructor = Mammal;
// Dog.prototype = Object.create(Mammal.prototype);
// Dog.prototype.constructor = Dog;

// // Define Methods/properties
// Animal.prototype.eat = function() { console.log(`${this.name} is eating.`) };
// Animal.kingdom = 'Animalia';

// Mammal.prototype.sleep = function() { console.log(`${this.name} is sleeping.`) };
// Mammal.taxonomyClass = 'Mammal';

// Dog.prototype.bark = function() {
//   console.log(`${this.name} the ${this.breed} is barking.`);
// }

// Dog.family = 'Canidae';



// class -> Pseudo-Classical
// 1) Create constructor functions for each class
// 2) Connect each constructor to its superclass constructor.
// 3) Connect each constructor's .prototype to its superclass constructor's
//    .prototype.
// 4) Modify each constructor to invoke the superclass constructor 
//    (simulating super())
//    >> Since the constructors will be invoked with new, `this` will be the 
//       newInstance being created - so we can invoke the superclass constructor
//       manually, with an explicit context, to set the properties defined in
//       the superclass constructor on the newInstance.
// 5) Define instance methods on each constructor's .prototype.
// 6) Define static properties on each constructor.




// // Usage
// let myDog = new Dog('Rex', true, 'German Shepherd');



// myDog.eat();    // Rex is eating.
// myDog.sleep();  // Rex is sleeping.
// myDog.bark();   // Rex the German Shepherd is barking.