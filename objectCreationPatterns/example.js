
// Challenge: Create an array in closure
// - every time createDog is called, its array resets (if array is
//   defined inside)
// - so array has to be defined outside
// - but we don't want it to be public

// IIFE
const createDog = (function() {
  const allDogs = [];

  function dogFactory(name) {
    let newDog = { name };
    allDogs.push(newDog);
    return newDog;
  }

  dogFactory.allDogs = allDogs;

  return dogFactory;
})();

// function createDog(name) {
//   let dog = { name };
//   Dog.allDogs.push(dog);
//   return dog;
// }

let dog1 = createDog('Dog 1');
let dog2 = createDog('Dog 2');

console.log(createDog.allDogs); // [ { name: 'Dog 1' }, { name: 'Dog 2' } ]
