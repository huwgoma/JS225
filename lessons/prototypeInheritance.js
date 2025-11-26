// 1) Rewrite the smartphone class using the constructor/prototype
//    pattern.

// function SmartPhone(brand, model, releaseYear) {
//   this.brand = brand;
//   this.model = model;
//   this.releaseYear = releaseYear;
// }

// SmartPhone.prototype.displayInfo = function() {
//   console.log(`This is a ${this.releaseYear} ${this.brand} ${this.model}`);
// }

// SmartPhone.prototype.displayBattery = function() {
//   console.log('Battery Level: 67%');
// }

// let iPhone12 = new SmartPhone('Apple', 'iPhone 12', 2020);
// let galaxyS21 = new SmartPhone('Samsung', 'Galaxy S21', 2021);



// 2) Rewrite the vehicle, car, boat, and plane classes using the
//    constructor/prototype pattern.
// -- All vehicles have a color and weight
// -- Cars have license numbers, boats have home ports, planes have
//    airline names

// -- All vehicles can accelerate/decelerate
// -- Cars can honk, boats can drop anchors, planes can take off/land


function Vehicle(color, weight) {
  this.color = color;
  this.weight = weight;
}

function Car(color, weight, licenseNumber) {
  Vehicle.call(this, color, weight);
  this.licenseNumber = licenseNumber;
}

function Boat(color, weight, homePort) {
  Vehicle.call(this, color, weight);
  this.homePort = homePort;
}

function Plane(color, weight, airlineName) {
  Vehicle.call(this, color, weight);
  this.airlineName = airlineName;
}

// Linking
Object.setPrototypeOf(Car, Vehicle);
Object.setPrototypeOf(Boat, Vehicle);
Object.setPrototypeOf(Plane, Vehicle);

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

// Methods
Vehicle.prototype.accelerate = function() { console.log('Accelerating') };
Vehicle.prototype.decelerate = function() { console.log('Decelerating') };

Car.prototype.honk = function() { console.log('Honk') };

Boat.prototype.dropAnchor = function() { console.log('Dropping anchor') };

Plane.prototype.takeOff = function() { console.log('Taking off') };
Plane.prototype.land = function() { console.log('Landing') };

// Usage

let car = new Car('White', 2000, 'XLC 9X3');
car.honk();
car.accelerate();
car.decelerate();
car.licenseNum;

let boat = new Boat('Blue', 9000, 'Home Port?');
boat.dropAnchor();
boat.accelerate();
boat.decelerate();
boat.homePort;

let plane = new Plane('Yellow', 40000, 'AA');
plane.accelerate();
plane.decelerate();
plane.takeOff();
plane.land();
plane.airline;
