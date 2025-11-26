// Object Orientation
// (Inventory Management)

// 1) Suppose we want to keep track of products in our inventory.
//    Currently, we have the following:
// let scissorsId = 0;
// let scissorsName = 'Scissors';
// let scissorsStock = 8;
// let scissorsPrice = 10;

// let drillId = 1;
// let drillName = 'Cordless Drill';
// let drillStock = 15;
// let drillPrice = 45;
// - Refactor this code to use an object-oriented approac.

// function generateIncrementer() {
//   let count = 0;
//   return function() { return count++ }
// }

// const nextProductID = generateIncrementer();

// function createProduct(name, stock, price) {
//   return {
//     id: nextProductID(),
//     name,
//     stock,
//     price,
//   };
// }

// let scissors = createProduct('Scissors', 8, 10);
// let drill    = createProduct('Cordless Drill', 15, 45);


// 2) Create a function that takes a product object as its argument
//    and sets the object's price to a non-negative number (given as 
//    argument).
// - If the new price is negative, alert the user that the new price
//   is invalid.

// function generateIncrementer() {
//   let count = 0;
//   return function() { return count++ }
// }

// const nextProductID = generateIncrementer();

// function createProduct(name, stock, price) {
//   return {
//     id: nextProductID(),
//     name,
//     stock,
//     price,
//   };
// }

// let scissors = createProduct('Scissors', 8, 10);
// let drill    = createProduct('Cordless Drill', 15, 45);

// function setPrice(product, newPrice) {
//   if (typeof newPrice !== 'number' || newPrice < 0) {
//     return console.log('New price is invalid! (Must be a positive number.)');
//   }

//   product.price = newPrice;
// }

// console.log(scissors.price); // 10
// setPrice(scissors, 12);
// console.log(scissors.price); // 12
// setPrice(scissors, -12); // invalid
// setPrice(scissors, 'abc'); // invalid


// 3) Implement a function that outputs a description of a given 
//    product object.

// function describeProduct(product) {
//   console.log(`Name:  ${product.name}`);
//   console.log(`ID:    ${product.id}`);
//   console.log(`Price: $${product.price}`);
//   console.log(`Stock: ${product.stock}`);
// }


// describeProduct(scissors);
// // => Name: Scissors
// // => ID: 0
// // => Price: $10
// // => Stock: 8


// 4) Rewrite the two functions above as methods in each product object.
function generateIncrementer() {
  let count = 0;
  return function() { return count++ }
}

const nextProductID = generateIncrementer();

function createProduct(name, stock, price) {
  return {
    id: nextProductID(),
    name,
    stock,
    price,

    setPrice(newPrice) {
      if (typeof newPrice !== 'number' || newPrice < 0) {
        return console.log('Invalid Price!');
      }

      this.price = newPrice;
    },

    describe() {
      console.log(`Name:  ${this.name}`);
      console.log(`ID:    ${this.id}`);
      console.log(`Price: $${this.price}`);
      console.log(`Stock: ${this.stock}`);
    }
  };
}

let scissors = createProduct('Scissors', 8, 10);
let drill    = createProduct('Cordless Drill', 15, 45);

console.log(scissors.price); // 10
scissors.setPrice(12);
console.log(scissors.price); // 12
scissors.setPrice(-12);      // invalid
scissors.setPrice('abc');    // invalid

scissors.describe();
// => Name: Scissors
// => ID: 0
// => Price: $12
// => Stock: 8
