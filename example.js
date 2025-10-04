function change(obj) {
  obj.count += 1;
  console.log(obj.count);
}

let object = { count: 0 }

change(object);

console.log(object);  