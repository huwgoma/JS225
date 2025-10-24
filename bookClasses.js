// 1) Rewrite the smartphone factory using classes.

// function createPhone(brand, model, year) {
//   return {
//     brand,
//     model,
//     year,
//     displayBattery() { console.log('Battery Level: 67%') },
//     displayInfo()    { console.log(`${this.brand} ${this.model} ${this.year}`) },
//   };
// }

// let iPhone12  = createPhone('Apple', 'iPhone 12', 2020);
// let galaxyS21 = createPhone('Samsung', 'Galaxy S21', 2021);

// class Phone {
//   constructor(brand, model, year) {
//     this.brand = brand;
//     this.model = model;
//     this.year  = year;
//   }

//   displayBattery() {
//     console.log('Battery Level: 9%');
//   }

//   displayInfo() {
//     console.log(`${this.year} ${this.brand} ${this.model}`);
//   }
// }

// let iPhone12  = new Phone('Apple', 'iPhone 12', 2020);
// let galaxyS21 = new Phone('Samsung', 'Galaxy S21', 2021);



// 2) Given a Dog class and an object assigned to `boo`, how can
//    you tell if `boo` is an instance of `Dog`?
// A: `boo instanceof Dog`




// 3) Create a class hierarchy for vehicles:
// -- Cars/Boats/Planes
// -- All vehicles have a color and weight
// -- Cars have license numbers, boats have home ports, planes have
//    airline names

// -- All vehicles can accelerate/decelerate
// -- Cars can honk, boats can drop anchors, planes can take off/land

class Vehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }

  accelerate() { console.log('Accelerating') }
  decelerate() { console.log('Decelerating') }
}

class Car extends Vehicle {
  constructor(color, weight, licenseNum) {
    super(color, weight);
    this.licenseNum = licenseNum;
  }

  honk() { console.log('Honk!') }
}

class Boat extends Vehicle {
  constructor(color, weight, homePort) {
    super(color, weight);
    this.homePort = homePort;
  }

  dropAnchor() { console.log('Dropping the anchor') }
}

class Plane extends Vehicle {
  constructor(color, weight, airline) {
    super(color, weight);
    this.airline = airline;
  }

  takeOff() { console.log('Taking off') }
  land()    { console.log('Landing') }
}

let car = new Car('White', 2000, 'XLC 9X3');
// car.honk();
// car.accelerate();
// car.decelerate();
// car.licenseNum;

let boat = new Boat('Blue', 9000, 'Home Port?');
// boat.dropAnchor();
// boat.accelerate();
// boat.decelerate();
// boat.homePort;

let plane = new Plane('Yellow', 40000, 'AA');
// plane.accelerate();
// plane.decelerate();
// plane.takeOff();
// plane.land();
// plane.airline;



// 4) Using the solution to Q3, demonstrate that:
// -- cars and boats are both instances of Vehicle
// -- cars are instances of Car 
// -- boats are not instances of Car

// - cars/boats are both instances of Vehicle
console.log(new Car()  instanceof Vehicle); // true
console.log(new Boat() instanceof Vehicle); // true

// - cars are instances of Car
console.log(new Car() instanceof Car); //  true
// - boats are not instances of Car
console.log(new Boat() instanceof Car); //  false