// Create an object that represents a Cessna 152 aircraft. 
// - The aircraft should include information:
// 1) Fuel Capacity (24.5 gallons)
// 2) Cruising Speed (111 knots)
// - The aircraft should also be able to take off and land.

let cessna152 = {
  fuelCapacityGallons: 24.5,
  cruisingSpeedKnots:  111,
  
  takeOff() { console.log('Taking off!') },
  land()    { console.log('Landing!') }
}


// Write a constructor function that creates objects representing books
// - Each book should have a title, author, and a year of publication.
// - Create objects for the following 2 books:

// Title	        Author	        Year Published
// Neuromancer	  William Gibson	1984
// Doomsday Book	Connie Willis	  1992

function Book(title, author, yearOfPublication) {
  this.title = title;
  this.author = author;
  this.yearOfPublication = yearOfPublication;
}

let neuromancer = new Book('Neuromancer', 'William Gibson', 1984);
let doomsday    = new Book('Doomsday Book', 'Connie Willis', 1992);

// Type of objects created => Book
// Constructor function    => Book (function)
// Instance objects        => neuromancer & doomsday


// Write a constructor function that creates musical album objects.
// - Each album should have a title, artist, and release year.
// - Create objects for the following 2 albums:
// Title	                    Artist	          Release Year
// Thriller	                  Michael Jackson	  1982
// The Dark Side of the Moon	Pink Floyd	      1973

function Album(title, artist, released) {
  this.title    = title;
  this.artist   = artist;
  this.released = released;
}

let thriller = new Album('Thriller', 'Michael Jackson', 1982);
let theDarkSideOfTheMoon = new Album(
  'The Dark Side of the Moon', 'Pink Floyd', 1973
);

// Type        => Album
// Constructor => Album (function)
// Instances   => thriller & theDarkSideOfTheMoon


// Write a constructor that creates objects representing smartphones,
// with brand, model, and release year. Each smartphone should also be
// able to return its battery level and display its information.
// Brand	  Model	      Release Year
// Apple	  iPhone 12	  2020
// Samsung	Galaxy S21	2021

function Smartphone(brand, model, released) {
  this.brand    = brand;
  this.model    = model;
  this.released = released;

  this.batteryLevel = function() { 
    console.log('Battery is currently at 100%');
  };

  this.about = function() {
    console.log(`This is a ${brand} ${model} released in ${released}.`);
  }
}

let iPhone12 = new Smartphone('Apple', 'iPhone 12', 2020);
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', 2021);

iPhone12.batteryLevel();
iPhone12.about();

galaxyS21.batteryLevel();
galaxyS21.about();