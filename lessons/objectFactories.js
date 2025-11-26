// Functions as Object Factories

// 1) Given the following code:
// let chile = {
//   name: 'The Republic of Chile',
//   continent: 'South America',
//   getDescription() {
//     return this.name + ' is located in ' + this.continent + '.';
//   },
// };

// let canada = {
//   name: 'Canada',
//   continent: 'North America',
//   getDescription() {
//     return this.name + ' is located in ' + this.continent + '.';
//   },
// };

// let southAfrica = {
//   name: 'The Republic of South Africa',
//   continent: 'Africa',
//   getDescription() {
//     return this.name + ' is located in ' + this.continent + '.';
//   },
// };

// Identify the aspects in this code that can be extracted to a factory
// function to eliminate duplication.
// - The name, continent, and getDescription properties are all 
//   duplicated, with the only difference being in their values.


// 2) Implement a factory function for the country objects above,
//    enabling the following interface:
// function makeCountry(name, continent) {
//   return {
//     name,
//     continent,
    
//     getDescription() {
//       return this.name + ' is located in ' + this.continent + '.';
//     },
//   }
// }

// let chile = makeCountry('The Republic of Chile', 'South America');
// let canada = makeCountry('Canada', 'North America');
// let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

// console.log(chile.getDescription());       // "The Republic of Chile is located in South America."
// console.log(canada.getDescription());      // "Canada is located in North America."
// console.log(southAfrica.getDescription()); // "The Republic of South Africa is located in Africa."


// 3/4 ) Alter the factory function so that the returned object 
//       includes a visited property with a default value of false.
// function makeCountry(name, continent, visited = false) {
//   return {
//     name,
//     continent,
//     visited,
    
//     getDescription() {
//       return this.name + ' is located in ' + this.continent + '.';
//     },
//   }
// }


// 5) Add a method to the returned country objects that allows us to
//    mark them as visited (visited = true)
// 6) Also updated getDescription to reflect the state of visited.
function makeCountry(name, continent, visited = false) {
  return {
    name,
    continent,
    visited,
    
    getDescription() {
      let description = `${this.name} is located in ${this.continent}.`;
      let haveVisited = this.visited ? 'have' : "haven't";

      return `${description} I ${haveVisited} visited ${this.name}.`;
    },

    visitCountry() {
      this.visited = true;
    }
  }
}

let canada = makeCountry('Canada', 'North America');
 
console.log(canada.getDescription()); // "Canada is located in North America. I haven't visited Canada."
canada.visitCountry();
console.log(canada.getDescription()); // "Canada is located in North America. I have visited Canada."