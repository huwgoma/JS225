// 1) Use the OLOO pattern to create an object prototype that can
//    be used to create pet objects.

// const PetPrototype = {
//   init(animal, name) {
//     this.animal = animal;
//     this.name   = name;
//     return this;  
//   },

//   sleep() { console.log('I am sleeping') },
//   wake()  { console.log('I am awake') },
// }


// let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake


// 2) Convert the code from Q1 to use the pseudo-classical pattern 
//    instead.

function Pet(animal, name) {
  this.animal = animal;
  this.name   = name;
}

Pet.prototype.sleep = function() { console.log('I am sleeping') };
Pet.prototype.wake  = function() { console.log('I am awake') };

let pudding = new Pet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = new Pet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake