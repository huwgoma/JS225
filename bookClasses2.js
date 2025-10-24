// 1) Rewrite the following Person class to use private fields for
//    name and age, and provide a setter for age. Ensure that the
//    age setter raiises a RangeError unless the age is a positive
//    number.

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   showAge() {
//     console.log(this.age);
//   }
// }

// let person = new Person('John', 30);
// person.showAge(); // 30
// person.age = 31;
// person.showAge(); // 31

// try {
//   // This line should raise a RangeError,
//   // but does not.
//   person.age = -5;
//   person.showAge(); // -5
// } catch (e) {
//   // The following line should run, but won't
//   console.log('RangeError: Age must be positive');
// }


// class Person {
//   #name;
//   #age;

//   constructor(name, age) {
//     this.#name = name;
//     this.age = age;
//   }

//   showAge() {
//     console.log(this.#age);
//   }

//   set age(newAge) {
//     if (!(newAge > 0)) throw new RangeError('Age must be positive');
    
//     this.#age = newAge;
//   }
// }

// let person = new Person('John', 30);
// person.showAge(); // 30
// person.age = 31;
// person.showAge(); // 31

// try {
//   person.age = -5;
//   person.showAge(); 
// } catch (e) {
//   console.log('RangeError: Age must be positive');
// }



// 2) Create a Book class with the private fields title, author, and
//    year. Provide getters for each field and a setter for year that
//    raises a RangeError if year is before 1900.

// class Book {
//   #title
//   #author
//   #year

//   constructor(title, author, year) {
//     this.#title = title;
//     this.#author = author;
//     this.#year = year;
//   }

//   get title()  { return this.#title };
//   get author() { return this.#author };
//   get year()   { return this.#year };

//   set year(newYear) {
//     if (!(newYear > 1900)) throw new RangeError('Invalid Year');

//     this.#year = newYear;
//   }
// }

// let book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
// console.log(book.title);  // The Great Gatsby
// console.log(book.author); // F. Scott Fitzgerald
// console.log(book.year);   // 1925

// book.year = 1932;         // Changing year
// console.log(book.year);   // 1932

// try {
//   book.year = 1825;
// } catch (e) {
//   console.log(e);   // RangeError: Invalid year
// }

// try {
//   let book2 = new Book('A Tale of Two Cities', 'Charles Dickens', 1859);
// } catch (e) {
//   console.log(e);   // RangeError: Invalid year
// }




// 3) Create a BankAccount class with a private balance field. Add a 
//    private method, #checkBalance, that logs the current balance.
//    Also add public methods `deposit` and `withdraw`; raise a Range
//    Error if there are insufficient funds for the withdrawal.

// class BankAccount {
  // #balance = 0;

  // #checkBalance() { console.log(`$${this.#balance}`) }

  // deposit(amount) {
    // // Probably validate that the given amount is a good number
    // this.#balance += amount;
    // this.#checkBalance();
  // }

  // withdraw(amount) {
    // if (this.#balance < amount) throw new RangeError('Insufficient funds');

    // this.#balance -= amount;
    // this.#checkBalance();
  // }
// }

// let account = new BankAccount();
// account.deposit(100);
// account.withdraw(50);
// account.withdraw(100); // RangeError: Insufficient funds




// 4) Create a Rectangle class with private width and height fields.
//    Provide getters and setters for both fields. The setters should
//    raise a RangeError if the width or height is not a positive number.
//    Add an area getter to compute the area of the rectangle.
// class Rectangle {
//   #width;
//   #height;

//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }

//   get width()  { return this.#width }
//   get height() { return this.#height }
//   get area()   { return this.width * this.height }
  
//   set width(newWidth) {
//     if (!this.#isPositive(newWidth)) throw new RangeError('width must be positive');
//     this.#width = newWidth;
//   }

//   set height(newHeight) {
//     if (!this.#isPositive(newHeight)) throw new RangeError('height must be positive');
//     this.#height = newHeight;
//   }

//   #isPositive(number) { return number > 0 }
// }

// let rect = new Rectangle(10, 5);
// console.log(rect.area); // 50

// rect.width = 20;
// console.log(rect.area); // 100

// rect.height = 12;
// console.log(rect.area); // 240

// try {
  // rect.width = 0;
// } catch (e) {
  // console.log(e); // RangeError: width must be positive
// }

// try {
  // rect.height = -10;
// } catch (e) {
  // console.log(e); // RangeError: height must be positive
// }



// 5) Create a MathUtils class with static methods add, subtract, 
//    multiply, and divide.

// class MathUtils {
//   static add(x, y) { return x + y }
//   static subtract(x, y) { return x - y }
//   static multiply(x, y) { return x * y }

//   static divide(x, y) {
//     if (y === 0) throw new RangeError('Division by 0');

//     return x / y;
//   }
// }

// console.log(MathUtils.add(5, 3));       // 8
// console.log(MathUtils.subtract(10, 4)); // 6
// console.log(MathUtils.multiply(6, 7));  // 42
// console.log(MathUtils.divide(20, 5));   // 4
// console.log(MathUtils.divide(10, 0));   // RangeError: Division by zero