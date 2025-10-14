// 1) Create an object named account that represents a bank account,
//    containing a balance property that stores the account's current
//    balance.

// let account = { 
//   balance: 0,
// };



// 2) Add a deposit method that takes a single argument representing the
//    deposit value, adds the value to the account balance, then returns
//    the deposit amount.

// let account = { 
//   balance: 0,

//   deposit(amount) {
//     this.balance += amount;
//     return amount;
//   },
// };

// console.log(account.balance);
// // 0
// console.log(account.deposit(12));
// // 12
// console.log(account.balance);
// // 12
// console.log(account.deposit(10));
// // 10
// console.log(account.balance);
// // 22



// 3) Add a withdraw method that takes a single argument (amount to
//    withdraw), subtracts the amount from balance, and returns the
//    amount subtracted.
// -- If the account contains less than the withdrawal amount, the
//    return value (and the amount withdrawn) should be limited to
//    the amount that is actually available.

// let account = { 
//   balance: 0,

//   deposit(amount) {
//     this.balance += amount;
//     return amount;
//   },

//   withdraw(amount) {
//     let amountToWithdraw = Math.min(this.balance, amount);
//     this.balance -= amountToWithdraw;
//     return amountToWithdraw;
//   }
// };

// account.balance = 100;

// console.log(account.balance);
// // 100
// console.log(account.withdraw(19));
// // 19
// console.log(account.balance);
// // 81

// // Zeroing Out
// console.log(account.balance);
// // 81
// console.log(account.withdraw(91));
// // 81
// console.log(account.balance);
// // 0



// 4) Each account should have a record of deposits and withdrawals.
// -- Add a transactions property to account that contains an array 
//    of transactions, each of which is an object with type/amount
//    properties.

// let account = { 
//   balance: 0,
//   transactions: [],

//   deposit(amount) {
//     this.balance += amount;
//     this.transactions.push({ type: 'deposit', amount });
//     return amount;
//   },

//   withdraw(amount) {
//     let amountToWithdraw = Math.min(this.balance, amount);
//     this.balance -= amountToWithdraw;
//     this.transactions.push({ type: 'withdrawal', amount: amountToWithdraw });
//     return amountToWithdraw;
//   }
// };

// console.log(account.deposit(23));
// // 23
// console.log(account.withdraw(19));
// // 19
// console.log(account.withdraw(10));
// // 4
// console.log(account.transactions);
// // [{...}, {...}, {...}]
// console.log(account.transactions[0]);
// // {type: "deposit", amount: 23}
// console.log(account.transactions[1]);
// // {type: "withdrawal", amount: 19}
// console.log(account.transactions[2]);
// // {type: "withdrawal", amount: 4}



// 5) Extract the code for creating bank accounts to a makeAccount 
//    function that returns a new account object.

// function makeAccount() {
//   return {
//     balance: 0,
//     transactions: [],
    
//     deposit(amount) {
//       this.balance += amount;
//       this.transactions.push({ type: 'deposit', amount });
//       return amount;
//     },
  
//     withdraw(amount) {
//       let amountToWithdraw = Math.min(this.balance, amount);
//       this.balance -= amountToWithdraw;
//       this.transactions.push({ type: 'withdrawal', amount: amountToWithdraw });
//       return amountToWithdraw;
//     }
//   }
// }

// let account = makeAccount();
// console.log(account.deposit(15));
// // 15
// console.log(account.balance);
// // 15
// let otherAccount = makeAccount();
// console.log(otherAccount.balance);
// // 0



// 6) Create a function that returns an object representing a bank,
//    with an accounts property that represents a list of accounts.

// function makeBank() {
//   return {
//     accounts: [],
//   };
// }

// let bank = makeBank();
// console.log(bank.accounts);
// // []



// 7) Add an `openAccount` method to bank that should:
// a) Create a new account
// b) Add the new account to bank.accounts
// c) Return the new account
// -- Each new account should have a unique account number, starting 
//    at 101 and incrementing by 1 for each account.

// function makeBank() {
//   const startingID     = 101;
//   let   nextID         = startingID;
//   const generateNextID = () => nextID++;

//   return {
//     accounts: [],

//     openAccount() {
//       let newAccount = makeAccount();
//       newAccount.number = generateNextID();
//       this.accounts.push(newAccount);

//       return newAccount;
//     }
//   };
// }

// function makeAccount() {
//   return {
//     balance: 0,
//     transactions: [],
    
//     deposit(amount) {
//       this.balance += amount;
//       this.transactions.push({ type: 'deposit', amount });
//       return amount;
//     },
  
//     withdraw(amount) {
//       let amountToWithdraw = Math.min(this.balance, amount);
//       this.balance -= amountToWithdraw;
//       this.transactions.push({ type: 'withdrawal', amount: amountToWithdraw });
//       return amountToWithdraw;
//     }
//   }
// }

// let bank = makeBank();
// let account = bank.openAccount();
// console.log(account.number); // 101
// console.log(bank.accounts);  // [{...}]
// console.log(bank.accounts[0]); 
// // { number: 101, balance: 0, transactions: [], 
// //   deposite: [Function: deposit], withdraw: [Function: withdraw] }

// let secondAccount = bank.openAccount();
// console.log(secondAccount.number); // 102



// 8) Add a new method to the bank object that transfers money from
//    one acccount to another.
// function makeBank() {
//   const startingID     = 101;
//   let   nextID         = startingID;
//   const generateNextID = () => nextID++;

//   return {
//     accounts: [],

//     openAccount() {
//       let newAccount = makeAccount();
//       newAccount.number = generateNextID();
//       this.accounts.push(newAccount);

//       return newAccount;
//     },

//     transfer(source, destination, amount) {
//       let amountWithdrawn = source.withdraw(amount);
//       destination.deposit(amountWithdrawn);

//       return amountWithdrawn;
//     }
//   };
// }

// function makeAccount() {
//   return {
//     balance: 0,
//     transactions: [],
    
//     deposit(amount) {
//       this.balance += amount;
//       this.transactions.push({ type: 'deposit', amount });
//       return amount;
//     },
  
//     withdraw(amount) {
//       let amountToWithdraw = Math.min(this.balance, amount);
//       this.balance -= amountToWithdraw;
//       this.transactions.push({ type: 'withdrawal', amount: amountToWithdraw });
//       return amountToWithdraw;
//     }
//   }
// }

// let bank = makeBank();
// let source = bank.openAccount();
// console.log(source.deposit(10));
// // 10
// let destination = bank.openAccount();
// console.log(bank.transfer(source, destination, 7));
// // 7
// console.log(source.balance);
// // 3
// console.log(destination.balance);
// // 7

// // If the transfer amount is more than the source's balance, floor
// //  the amount to source.balance
// console.log(bank.transfer(source, destination, 5));
// // 3
// console.log(source.balance);
// // 0
// console.log(destination.balance);
// // 10



// 9) Modify the code so that users can access the account balance,
//    account number, and transactions list via methods, but not via
//    direct property access.

// function makeBank() {
//   const startingID     = 101;
//   let   nextID         = startingID;
//   const generateNextID = () => nextID++;

//   return {
//     accounts: [],

//     openAccount() {
//       let accountID  = generateNextID();
//       let newAccount = makeAccount(accountID);
//       this.accounts.push(newAccount);

//       return newAccount;
//     },

//     transfer(source, destination, amount) {
//       let amountWithdrawn = source.withdraw(amount);
//       destination.deposit(amountWithdrawn);

//       return amountWithdrawn;
//     }
//   };
// }

// function makeAccount(number) {
//   let balance = 0;
//   let transactions = [];
  
//   return {
//     balance:      () => balance,
//     transactions: () => transactions.slice(),
//     number:       () => number,
    
//     deposit(amount) {
//       balance += amount;
//       transactions.push({ type: 'deposit', amount });
//       return amount;
//     },
  
//     withdraw(amount) {
//       let amountToWithdraw = Math.min(balance, amount);
//       balance -= amountToWithdraw;
//       transactions.push({ type: 'withdrawal', amount: amountToWithdraw });
//       return amountToWithdraw;
//     }
//   }
// }


// // Usage:
// let bank = makeBank();
// let account = bank.openAccount();
// console.log(account.balance());
// // 0
// console.log(account.deposit(17));
// // 17
// let secondAccount = bank.openAccount();
// console.log(secondAccount.number());
// // 102
// console.log(account.transactions());
// // [{...}]




// 10) Change the code so that users can no longer access the list of
//     accounts associated with a bank.
function makeBank() {
  const startingID     = 101;
  let   nextID         = startingID;
  const generateNextID = () => nextID++;

  let accounts = [];

  return {
    openAccount() {
      let accountID  = generateNextID();
      let newAccount = makeAccount(accountID);
      accounts.push(newAccount);

      return newAccount;
    },

    transfer(source, destination, amount) {
      let amountWithdrawn = source.withdraw(amount);
      destination.deposit(amountWithdrawn);

      return amountWithdrawn;
    }
  };
}

function makeAccount(number) {
  let balance = 0;
  let transactions = [];
  
  return {
    balance:      () => balance,
    transactions: () => transactions.slice(),
    number:       () => number,
    
    deposit(amount) {
      balance += amount;
      transactions.push({ type: 'deposit', amount });
      return amount;
    },
  
    withdraw(amount) {
      let amountToWithdraw = Math.min(balance, amount);
      balance -= amountToWithdraw;
      transactions.push({ type: 'withdrawal', amount: amountToWithdraw });
      return amountToWithdraw;
    }
  }
}


// Usage:
let bank = makeBank();
console.log(bank.accounts);
// undefined