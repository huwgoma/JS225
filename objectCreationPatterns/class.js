// 1) Create a Cat class that logs "I'm a cat!" whenever a new instance
//    is created. Instantiate a new instance of Cat and assign it to
//    a kitty variable.

// class Cat {
//   constructor() {
//     console.log("I'm a cat!");
//   }
// }

// let kitty = new Cat();



// 2) Extend the code from Q1 to specify a name for the Cat object.
//    If no name is given, the name should default to Kitty.
//    Update the logged message to include the given name.

// class Cat {
//   #name;

//   constructor(name = 'Kitty') {
//     this.#name = name;
//     console.log(`I'm ${this.#name} - I'm a cat!`);
//   }
// }

// let kitty = new Cat();
// let fatty = new Cat('Fatty');



// 3) Extend the code from Q2 to move the greeting from constructor
//    to its own method. Also define another method called rename
//    to rename the Cat instance when invoked.

// class Cat {
//   #name;

//   constructor(name = 'Kitty') {
//     this.name = name;
//   }

//   get name() { return this.#name }
//   set name(newName) { this.#name = newName }

//   greet() { console.log(`I'm ${this.name} - I'm a cat!`) }
//   rename(newName) { this.name = newName }
// }

// let kitty = new Cat();
// kitty.greet(); // I'm Kitty - I'm a cat!
// kitty.rename('Kit');
// kitty.greet(); // I'm Kit - I'm a cat!

// let fatty = new Cat('Fatty'); 
// fatty.greet(); // I'm Fatty - I'm a cat!



// 4) Extend the code from Q3 so that Cat.genericGreeting logs
// //    "Hello! I'm a cat!" when invoked.

// class Cat {
//   static genericGreeting() { console.log("Hello! I'm a cat!") }

//   #name;

//   constructor(name = 'Kitty') {
//     this.name = name;
//   }

//   get name() { return this.#name }
//   set name(newName) { this.#name = newName }

//   greet() { console.log(`I'm ${this.name} - I'm a cat!`) }
//   rename(newName) { this.name = newName }
// }

// Cat.genericGreeting();



// 5) Create a Rectangle class that takes 2 arguments (width/length).

// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }

//   getWidth() { return this.width }
//   getLength() { return this.length }
//   getArea() { return this.getWidth() * this.getLength() }
// }

// let rect = new Rectangle(4, 5);

// console.log(rect.getWidth()); // 4
// console.log(rect.getLength()); // 5
// console.log(rect.getArea()); // 20



// 6) Write a Square class that inherits from Rectangle.
// class Rectangle {
//   constructor(width, length) {
//     this.width = width;
//     this.length = length;
//   }

//   getWidth() { return this.width }
//   getLength() { return this.length }
//   getArea() { return this.getWidth() * this.getLength() }
// }


// class Square extends Rectangle {
//   constructor(side) {
//     super(side, side);
//   }
// }

// let square = new Square(5);
// console.log(`area of square = ${square.getArea()}`); 
// // area of square = 25



// 7) Without calling the Cat constructor, create an object that looks 
//    and acts like a Cat instance that doesn't have a defined name.

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype);
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.hasOwnProperty('name')); // logs false
// console.log(fakeCat.speaks()); // logs undefined says meowwww.



// 8) Given the following program, update the code to produce the 
//    desired output:

// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, furColor) {
//     super(name, age);
//     this.furColor = furColor;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ` +
//            `${this.furColor} fur.`;
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

// console.log(pudding.info());
// console.log(butterscotch.info());

// Desired Output
// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.



// 9) Given an Animal class, create two classes (Dog/Cat) that inherit
//    from it.
// -- Cat should take 3 arguments (name, age, status), 
//    leg count = 4, species = cat, 
//    introduce extends Animal#introduce with an additional Meow meow!

// -- Dog should take 4 args (name, age, status, master)
//    leg count = 4, species = dog
//    introduce is the same as the inherited Animal#introduce
//    greetmaster() => Returns Hello <masterName)! Woof, woof!

// class Animal {
//   constructor(name, age, legs, species, status) {
//     this.name = name;
//     this.age = age;
//     this.legs = legs;
//     this.species = species;
//     this.status = status;
//   }
//   introduce() {
//     return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
//   }
// }

// class Cat extends Animal {
//   constructor(name, age, status) {
//     super(name, age, 4, 'cat', status);
//   }

//   introduce() {
//     return `${super.introduce()} Meow meow!`;
//   }
// }

// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, 'dog', status);
//     this.master = master;
//   }

//   greetMaster() { return `Hello, ${this.master}! Woof, woof!` }
// }

// let fatty = new Cat('Fatty', 14, 'fat');
// console.log(fatty.introduce());
// // Hello, my name is Fatty and I am 14 years old and happy. Meow meow!

// let bao = new Dog('Bao', 3, 'hyper', 'Bobby');
// console.log(bao.introduce());
// console.log(bao.greetMaster());



// 10) Refactor the following classes to use a common superclass and
//     inherit behavior as needed.

// class Automobile {
//   #make;
//   #model;
//   #wheels;

//   constructor(make, model, wheels) {
//     this.#make = make;
//     this.#model = model;
//     this.#wheels = wheels;
//   }

//   getWheels() { return this.#wheels }
//   info() { return `${this.#make} ${this.#model}`};
// }

// class Car extends Automobile {
//   constructor(make, model) {
//     super(make, model, 4);
//   }
// }

// class Motorcycle extends Automobile {
//   constructor(make, model) {
//     super(make, model, 2);
//   }
// }

// class Truck extends Automobile {
//   constructor(make, model, payload) {
//     super(make, model, 6);
//     this.payload = payload;
//   }
// }



// 11) What will the following code log?
// class Something {
//   constructor() {
//     this.data = "Hello";
//   }

//   dupData() {
//     return this.data + this.data;
//   }

//   static dupData() {
//     return "ByeBye";
//   }
// }

// let thing = new Something();
// console.log(Something.dupData());
// console.log(thing.dupData());

// A: This code will log "ByeBye" on Line 16, and "HelloHello" on
//    Line 17.
// -- Line 16 invokes the static dupData method, which returns the string
//    "ByeBye"; Line 17 invokes the instance dupData method on `thing`,
//    which returns the duplicated string "HelloHello".



// 12) Rewrite the following code to use the class keyword instead of
//     the constructor/prototype pattern.
// -- Person has a greeting method; shouter is a subtype of person
//    with all output text uppercased.

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.greeting = function() {
//   return `Hello, I'm ${this.name}. It's very nice to meet you.`;
// }

// function Shouter(name) {
//   Person.call(this, name);
// }

// Shouter.prototype = Object.create(Person.prototype);
// Shouter.prototype.greeting = function() {
//   return Person.prototype.greeting.call(this).toUpperCase();
// }

// class Person {
//   #name;
  
//   constructor(name) {
//     this.#name = name;
//   }

//   get name() { return this.#name }

//   greeting() { 
//     return `Hello, I'm ${this.name}. It's very nice to meet you.`;
//   }
// }

// class Shouter extends Person { 
//   greeting() { return super.greeting().toUpperCase() }
// }

// let person = new Person("Jane");
// let shouter = new Shouter("Bob");

// console.log(person.greeting()); 
// // Hello, I'm Jane. It's very nice to meet you.
// console.log(shouter.greeting()); 
// // HELLO, I'M BOB. IT'S VERY NICE TO MEET YOU.



// 13) Implement the classes/methods needed to produce the following
//     output:

// Objects:
// - Pet (species, name)
// - Owner(name)
// - Shelter() 

// Shelter can adopt (owner object, pet object)
// Shelter can print adoptions 
// => <Owner> has adopted the following pets:
// => a <pet.species> named <pet.name>
// - Shelter maintains a list (hash) of adoptions
//   owner: [adopted pet, adopted pet, ...]

// Owner can calculate the numberOfPets() it has
// - Owner maintains a list of its pets; numberOfPets just calculates
//   the size of that list
// - Owner pets may not necessarily all come from shelter 
//  - so owner.pets and shelter.adoptions[owner] might not be 1-1

// class Pet { 
//   #species;
//   #name;

//   constructor(species, name) {
//     this.#species = species;
//     this.#name    = name;
//   }

//   get species() { return this.#species }
//   get name()    { return this.#name }

//   info() { return `a ${this.species} named ${this.name}` }
// }

// class Owner {
//   #name;
//   #pets = [];

//   constructor(name) {
//     this.#name = name;
//   }

//   get name() { return this.#name }

//   addPet(newPet) { this.#pets.push(newPet) }
//   numberOfPets() { return this.#pets.length }
// }

// class Shelter {
//   #adoptions = new Map();

//   #registerAdoption(owner, pet) {
//     let ownerEntry = this.#adoptions.get(owner) || [];
//     this.#adoptions.set(owner, ownerEntry);

//     ownerEntry.push(pet);
//   }

//   adopt(owner, pet) {
//     this.#registerAdoption(owner, pet);
//     owner.addPet(pet);
//   }

//   printAdoptions() {
//     this.#adoptions.forEach((pets, owner) => {
//       if (pets.length > 0) {
//         console.log(`${owner.name} has adopted the following pets:`)
//         pets.forEach(pet => { console.log(pet.info()) });
//       } else {
//         console.log(`${owner.name} has not adopted any pets.`)
//       }
      
//       console.log("\n");
//     });
//   }
// }


// // Usage:
// let butterscotch = new Pet('cat', 'Butterscotch');
// let pudding      = new Pet('cat', 'Pudding');
// let darwin       = new Pet('bearded dragon', 'Darwin');
// let kennedy      = new Pet('dog', 'Kennedy');
// let sweetie      = new Pet('parakeet', 'Sweetie Pie');
// let molly        = new Pet('dog', 'Molly');
// let chester      = new Pet('fish', 'Chester');

// let phanson = new Owner('P Hanson');
// let bholmes = new Owner('B Holmes');

// let shelter = new Shelter();
// shelter.adopt(phanson, butterscotch);
// shelter.adopt(phanson, pudding);
// shelter.adopt(phanson, darwin);
// shelter.adopt(bholmes, kennedy);
// shelter.adopt(bholmes, sweetie);
// shelter.adopt(bholmes, molly);
// shelter.adopt(bholmes, chester);
// shelter.printAdoptions();
// console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
// console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// // Output: 
// // P Hanson has adopted the following pets:
// // a cat named Butterscotch
// // a cat named Pudding
// // a bearded dragon named Darwin

// // B Holmes has adopted the following pets:
// // a dog named Molly
// // a parakeet named Sweetie Pie
// // a dog named Kennedy
// // a fish named Chester

// // P Hanson has 3 adopted pets.
// // B Holmes has 4 adopted pets.



// 14) Given the following class for building boxed banners, complete 
//     it so that the test cases work as intended.
// -- Assume that the input will always fit in your terminal window 
//    (ie. no overflow)

class Banner {
  #message;
  #innerWidth;

  constructor(message) {
    this.#message = message;
    this.#innerWidth = message.length + 2;
  }

  get message() { return this.#message }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+${'-'.repeat(this.#innerWidth)}+`;
  }

  emptyLine() {
    return `|${' '.repeat(this.#innerWidth)}|`;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+