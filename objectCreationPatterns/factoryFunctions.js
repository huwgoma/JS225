// 1) What are two disadvantages of working with factory functions?
// a) The objects returned from a factory are not typed, and have 
//    have no link to the function they were produced from; their 
//    [[Prototype]] is the default Object.prototype.
// b) The objects returned from a factory each create separate copies
//    of their methods in memory.


// 2) Rewrite the code below to use object-literal syntax:
// function makeObj() {
//   let obj = {};
//   obj.propA = 10;
//   obj.propB = 20;
//   return obj;
// }

// function makeObj() {
//   return {
//     propA: 10,
//     propB: 20,
//   }
// }


// 3) Create a factory function that can be used to create invoices,
//    with the following specs:
// -- It returns an invoice object with phone/internet properties and
//    a total method.
// -- The default value for phone is 3000, and internet is 5500.
// -- The function takes an object argument with attributes to override
//    the default values.

// function createInvoice(services) {
//   let phone    = services?.phone ?? 3000;
//   let internet = services?.internet ?? 5500;

//   return { 
//     phone,
//     internet,
//     total() { return this.phone + this.internet },
//   };
// }

// function invoiceTotal(invoices) {
//   let total = 0;
//   let i;

//   for (i = 0; i < invoices.length; i += 1) {
//     total += invoices[i].total();
//   }

//   return total;
// }

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({
//   internet: 6500,
// }));

// invoices.push(createInvoice({
//   phone: 2000,
// }));

// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices));             // => 31000



// 4) Create a factory function for payments:
// -- The function can take an `object` argument in 3 forms:
// a) Payment for one service (eg. { phone: 1000 })
// b) Payment for both services (eg. { phone: 1000, internet: 2000 })
// c) Payment with just an amount (eg. { amount: 2000 })
// -- Returns an object with the paid services, and a total method that
//    returns the payment total (either amount or internet + phone)

// function createPayment(services = {}) {
//   let phone    = services.phone ?? 0;
//   let internet = services.internet ?? 0;
//   let amount   = services.amount;

//   return {
//     phone,
//     internet,
//     amount,

//     total() { 
//       return this.amount ?? (this.phone + this.internet);
//     }
//   }
// }

// function paymentTotal(payments) {
//   let total = 0;

//   for (let i = 0; i < payments.length; i++) {
//     total += payments[i].total();
//   }

//   return total;
// }

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));

// payments.push(createPayment({
//   phone: 2000,
// }));

// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));

// payments.push(createPayment({
//   amount: 10000,
// }));

// console.log(paymentTotal(payments));      // => 24000



// 5) Update createInvoice to make it possible to add payment(s) to 
//    invoices:

function createInvoice(services = {}) {
  let phone    = services.phone ?? 3000;
  let internet = services.internet ?? 5500;
  let paymentsApplied = [];

  const totalPaid = function() {
    return paymentsApplied.reduce((sum, payment) => {
      return sum + payment.total();
    }, 0);
  }

  return { 
    phone,
    internet,
    total() { return this.phone + this.internet },

    addPayment(payment) { paymentsApplied.push(payment) },
    addPayments(payments) { paymentsApplied.push(...payments) },

    amountDue() {
      return this.total() - totalPaid();
    }
  };
}

function createPayment(services = {}) {
  let phone    = services.phone ?? 0;
  let internet = services.internet ?? 0;
  let amount   = services.amount;

  return {
    phone,
    internet,
    amount,

    total() { 
      return this.amount ?? (this.phone + this.internet);
    }
  }
}

// usage
let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0