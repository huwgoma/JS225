// Context Loss

// 1) The desired output for the code below is 'Christopher Turk
//    is a Surgeon'. Does the code produce the desired output? 
//    Why or why not?

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription);

// A: This code will not produce the desired output; instead, it will
//    log "undefined undefined is a undefined."
// -- The key point of failure in this code is on Line 17 
//    (`let returnVal = func()`). Because `func` is invoked as a 
//    standalone function, its `this` value is set to the global
//    object, resulting in `undefined`s for all properties referenced
//    by `getDescription`.



// 2) Modify logReturnVal so that it takes an additional context 
//    argument, then modify the invocation of `func` to use the given
//    context object.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
//   }
// };

// function logReturnVal(func, context) {
//   let returnVal = func.call(context);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);



// 3) Suppose that we wanted to extract getDescription, but have the
//    extracted function always associated with turk. Assign this to
//    a new variable, getTurkDescription.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
//   }
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// let getTurkDescription = turk.getDescription.bind(turk);

// logReturnVal(getTurkDescription);



// 4) Consider the following code. Will this log the desired output?
//    Why or why not?
// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ' ' + title);
//     });
//   }
// };

// TESgames.listGames();

// Desired output:
// The Elder Scrolls Arena
// The Elder Scrolls Daggerfall
// The Elder Scrolls Morrowind
// The Elder Scrolls Oblivion
// The Elder Scrolls Skyrim

// A: This code will not produce the desired output; instead, it will
// log `'undefined Arena'`, `'undefined Daggerfall'`, etc.
// -- The key point of failure in this code is in how the callback 
//    function to `forEach` is implemented. Because the `forEach` method
//    invokes the given callback function as a standalone function, the
//    context for that invocation will be set to the global object, 
//    resulting in `undefined` when attempting to access `this.seriesTitle`.



// 5/6/7) Modify the code from Problem 4 to produce the desired output,
//        using either an arrow function, a local `self` variable, or
//        an additinal context argument allowed by forEach.

// Arrow Function (Preserves the context of execution from where it
// is defined; eg. the `TESgames.listGames` invocation)

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach((title) => {
//       console.log(this.seriesTitle + ' ' + title);
//     });
//   }
// };

// TESgames.listGames();


// `self` (Manually preserve the context of execution and allow the
// callback function to access the preserved context via closure)

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     let self = this;
//     this.titles.forEach(function(title) {
//       console.log(self.seriesTitle + ' ' + title);
//     });
//   }
// };

// TESgames.listGames();


// `thisArg` - An optional second argument accepted by forEach that
// represents the context in which the callback function should be
// executed.

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ' ' + title);
//     }, this);
//   }
// };

// TESgames.listGames();



// 8) What will the value of `foo.a` be after this code executes?
// let foo = {
//   a: 0,
//   incrementA() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   }
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// A: The value of `foo.a` after the third `incrementA` call will be 0.
// -- The reason why `foo.a` is not incremented is due to how the 
//    nested `increment` function is invoked as a standalone function,
//    which changes the value of `this` from `foo` to the global object.
//    Therefore, the incrementation of `this.a` will increment a nonexistent
//    `a` property on the global object, and not the `a` property on
//    `foo`.



// 9) Modify the code above such that `foo.a` will be 3 after the third
//    `incrementA` call.

// // Arrow Function
// let foo = {
//   a: 0,
//   incrementA() {
//     let increment = () => this.a += 1;

//     increment();
//   }
// };


// // Explicit Context Passing
// let foo = {
//   a: 0,
//   incrementA() {
//     function increment() {
//       this.a += 1;
//     }

//     increment.call(this);
//   }
// };

// // `self` fix - preserve context manually
// let foo = {
//   a: 0,
//   incrementA() {
//     let self = this;

//     function increment() {
//       self.a += 1;
//     }

//     increment();
//   }
// };

// // Bind `increment` to `foo`
// let foo = {
//   a: 0,
//   incrementA() {
//     let increment = function() {
//       this.a += 1;
//     }.bind(this);

//     increment();
//   }
// };


// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// console.log(foo.a);



// 10) We decide that we want each invocation of incrementA to increment
//     foo.a by 3, rather than 1:

// let foo = {
//   a: 0,
//   incrementA() {
//     function increment() {
//       this.a += 1;
//     }

//     increment.apply(this);
//     increment.apply(this);
//     increment.apply(this);
//   }
// };

// Refactor this code to remove the duplication of `increment.apply`.
let foo = {
  a: 0,
  incrementA() {
    let increment = function() {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  }
};

foo.incrementA();

console.log(foo.a);