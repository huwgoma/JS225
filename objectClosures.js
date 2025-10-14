// 1) Refactor the makeList function to return an object with 
//    add, remove, and list methods.

// function makeList() {
//   return {
//     items: new Set,

//     add(item) { 
//       this.items.add(item);
//       console.log(`${item} added!`);
//     },

//     remove(item) {
//       this.items.delete(item);
//       console.log(`${item} removed!`);
//     },

//     list() {
//       if (this.items.size === 0) {
//       console.log('The list is empty.');
//       } else {
//         this.items.forEach(item => console.log(item));
//       }
//     },
//   };
// }

// // Usage:
// let list = makeList();
// list.add('peas');
// // = peas added!
// list.list();
// // = peas
// list.add('corn');
// // = corn added!
// list.list();
// // = peas
// // = corn
// list.remove('peas');
// // = peas removed!
// list.list();
// // = corn



// 2) The current solution allows us to access the `items` property 
//    externally, via `list.items`.
// -- Refactor the code so the `items` object is not accessible from
//    outside the object.

function makeList() {
  let items = new Set;

  return {
    add(item) { 
      items.add(item);
      console.log(`${item} added!`);
    },

    remove(item) {
      items.delete(item);
      console.log(`${item} removed!`);
    },

    list() {
      if (items.size === 0) {
      console.log('The list is empty.');
      } else {
        items.forEach(item => console.log(item));
      }
    },
  };
}

// Usage:
let list = makeList();
list.add('peas');
// = peas added!
list.list();
// = peas
list.add('corn');
// = corn added!
list.list();
// = peas
// = corn
list.remove('peas');
// = peas removed!
list.list();
// = corn

console.log(list.items); // should be undefined