// 1) What will the following code output?
// let message = 'Hello from the global scope!';

// function func(message) {
//   message = 'Hello from the function scope!';
//   console.log(message);
// }

// func(message);
// console.log(message);

// This code will output 'Hello from the function scope!' from Line 6
// (invoked on Line 9), and 'Hello from the global scope!' on Line 10.
// - When the globally-scoped `message` is passed as an argument to the
//   `func` invocation on Line 9, the `func` function receives a copy of
//   the value referenced by `message`, assigning that string to its own
//   local `message` variable. On Line 5, the locally-scoped `message`
//   variable is *reassigned* to a new string, which only affects the
//   value of the function-scoped `message` variable. 
// - Therefore, Line 6 will output `'Hello from the function scope!'`, 
//   from the locally-scoped `message` variable (which was freshly-
//   reassigned on Line 5, and also shadows the outer-scoped `message`
//   variable due to sharing the same name).
// - Because the `message` variable created within the `func` function
//   is a separate variable, and the only operation within the function
//   was to reassign its locally-scoped variable to a different string,
//   the value of the original, globally-scoped `message` variable remains
//   unchanged on Line 10 (`'Hello from the global scope!'`).


// 2) What will the following code output? Why?
// -- What does this output demonstrate, relative to problem 1?

// let myObj = { message: 'Greetings from the global scope!' };

// function func(obj) {
//   obj.message = 'Greetings from the function scope!';
//   console.log(obj.message);
// }

// func(myObj);

// console.log(myObj.message);

// This code will output `'Greetings from the function scope!'` on both
// Lines 40 and 42.
// - When an object type is passed to a function, the function receives a
//   copy of the reference to the original object, which allows it to
//   potentially mutate the object's value permanently. We see this on
//   Line 36: reassigning an object property (`obj.message=`) is a 
//   destructive operation that permanently changes the value of the 
//   object, without changing its identity.
// - Therefore, after Line 36, the object referenced by both `myObj` 
//   (global) and `obj` (function) will have a new `message` property
//   of `'Greetings from the function scope!'`, which is reflected on
//   both Lines 37 and 42.
// - The primary difference demonstrated by this code, relative to the
//   previous problem, is that object-type arguments are passed by 
//   'reference-value', where the value that's passed to the function is
//   a copy of the reference to the original object. 
// - In contrast, primitive-type arguments are passed purely by value,
//   meaning no mutation is possible. 


// 3) What will the following code log to the console?
// let message = 'Hello from the global scope!';

// function func() {
//   message = 'Hello from the function scope!';
//   console.log(message);
// }

// func();
// console.log(message);

// This code will log `'Hello from the function scope!'` twice,
// on Line 69 and 73.
// - The most important line in this code is Line 68: because the `func`
//   function does not previously define any locally-scoped `message` 
//   variables, the assignment on Line 68 is actually interpreted as a
//   reassignment of the outer-scoped `message` variable, declared on 
//   Line 65. Therefore, both times `message` is referenced (Line 69
//   and Line 74), its value will be the newly-reassigned value, 
//   `'Hello from the function scope!'`.


// 4) What will the following code log to the console?
let a = 10;
let obj = {
  a // a: 10
}

let newObj = obj;
newObj.a += 10;

console.log(obj.a === a); // false (obj.a is 20, a is still 10)
console.log(newObj.a === obj.a); // true (newObj === obj)

// This code will output false on Line 96, and true on Line 97.
// - On Line 90, a new object is created with one property ('a': 10).
// - Line 93 then initializes a new variable (newObj) with a reference
//   to the same object referenced by obj. Thus, when Line 94 mutates the
//   object by reassigning its `a` property to 20, the change will be
//   reflected by both newObj and obj. We see this on Line 97; because
//   both newObj and obj reference the same object, they will also 
//   reflect the same changed value of `obj.a` (20).
// - Line 96 outputs false because the property reassignment on Line 94 
//   has nothing to do with the binding between the `a` variable declared
//   on Line 88; therefore, the variable `a`'s value in this code will
//   always remain unchanged (10).


// 5) Given the following code:
let animal = {
  name: 'Pumbaa',
  species: 'Phacochoerus africanus',
};

let menagerie = {
  warthog: animal,
};

animal = {
  name: 'Timon',
  species: 'Suricata suricatta',
};

menagerie.meerkat = animal;

console.log(menagerie.warthog === animal); // false
console.log(menagerie.meerkat === animal); // true

// Why does Line 130 return false?
// - Line 130 in this code returns false because the `===` operator 
//   in JavaScript compares object values by reference, not by value
//   (ie. it only returns true if both objects are the same object in
//    memory.)
// - On Line 120, the `menagerie` object is initialized with one initial
//   property: `warthog`, referencing the object initialized on Lines 
//   114-117 (we'll call this animalObjectA). 
// - On Lines 123-126, the `animal` variable is reassigned to a different
//   object (animalObjectB); a new property `meerkat` is added to the 
//   `menagerie` object on Line 128, referencing this second animal
//   object.
// - Therefore, on Line 130, the objects referenced by the `warthog`
//   property and the `animal` variable are no longer the same object 
//   (both by reference and by value), so the comparison returns false.