// 1) Create an object factory for the apple, banana, and blackberry
//    objects:

function createFruit(name, color) {
  return {
    name,
    color,
    isRipe()   { return `This ${this.name} is ripe.` },
    describe() { return `This ${this.name} is ${this.color}.` },
  }
}

let apple = createFruit('Apple', 'Red');
let banana = createFruit('Banana', 'Yellow');
let blackberry = createFruit('Blackberry', 'Black');



// 2) Write a factory function that creates smartphone objects:
// -- Properties: Brand, Model, Release Year
// -- Methods:    Battery Level, Smartphone Info

// Brand	  Model	      Release Year
// Apple	  iPhone 12	  2020
// Samsung	Galaxy S21	2021

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

// iPhone12.displayBattery();
// iPhone12.displayInfo();

// galaxyS21.displayBattery();
// galaxyS21.displayInfo();



// 3) Create an object factory that returns objects representing 
//    instruments.
// -- Properties: Name, Type
// -- Method: Play, display Type

function createInstrument(name, type) {
  return {
    play() { console.log(`We are playing a tune on this ${name}`) },
    showType() { console.log(`This ${name} is a ${type} instrument.`) },
  };
}

let cello = createInstrument('cello', 'string');
cello.play();     // We are playing a tune on this cello
cello.showType(); // This cello is a string instrument

let flute = createInstrument('flute', 'wind');
flute.play();      // We are playing a tune on this flute
flute.showType();  // This flute is a wind instrument

let drum = createInstrument('drum', 'percussion');
drum.play();       // We are playing a tune on this drum
drum.showType();   // This drum is a percussion instrument