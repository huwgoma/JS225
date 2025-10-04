"use strict";
// 1) Create a new `invoices` object, with an `unpaid` property pointing
//    to an empty array.

let invoices = {
  unpaid: []
};


// 2) Add a method (`add`) to invoices that takes two arguments:
// a) A String (client name)
// b) A Number (amount owing)
// - The `add` method should create a new object with the given arguments
//   and add it to the unpaid array.
// eg. { name: 'Starbucks', amount: 300 }

invoices.add = function(name, amount) {
  this.unpaid.push({ name, amount });
}

// invoices.add('Starbucks', 300);
// console.log(invoices);


// 3) Add a method (totalDue) that computes and returns the total of 
//    all unpaid invoices.

invoices.totalDue = function() {
  return this.unpaid.reduce((total, invoice) => {
    return total + invoice.amount;
  }, 0);
}

// console.log(invoices.totalDue());


// 4) Create 3 new unpaid invoices:
// Name	                  Amount
// Due North Development	250
// Moonbeam Interactive	  187.50
// Slough Digital	        300
// - Then log the total amount due.

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive',  187.50);
invoices.add('Slough Digital',        300);

console.log(invoices.totalDue());


// 5) Implement a way to mark invoices as paid:
// -- Add a `paid` array to invoices.
// -- Create a `payInvoice` method that takes a string (name) as 
//    argument, finds the corresponding invoice in the unpaid array, 
//    then moves that invoice to the `paid` array. 
// -- All other unpaid invoices should be moved to a new array that 
//    `unpaid` is reassigned to at the end of iteration.

invoices.paid = [];

invoices.payInvoice = function(invoiceName) {
  let unpaid = [];

  this.unpaid.forEach(invoice => {
    if (invoice.name === invoiceName) { 
      this.paid.push(invoice);
    } else {
      unpaid.push(invoice);
    }
  });

  this.unpaid = unpaid;
}

// invoices.payInvoice('Slough Digital');
// console.log(invoices.unpaid);
// console.log(invoices.paid);


// 6) Create a method that is functionally identical to totalDue, but
//    for the total of paid invoices (totalPaid)

invoices.totalPaid = function() {
  return this.paid.reduce((total, invoice) => {
    return total + invoice.amount;
  }, 0);
}


// 7) Call payInvoice twice (Due North Development and Slough Digital)
//    - Then call totalPaid and totalDue and log the results.
invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');

console.log(invoices.totalPaid()); // 550
console.log(invoices.totalDue());  // 187.50