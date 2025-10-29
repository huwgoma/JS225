let items = [];
let counter = 0;

function bar() { 
  counter += 1;
  items.push(`item ${counter}`);
}

function getCounter() { 
  return counter;
}

export { items, counter, bar, getCounter };
