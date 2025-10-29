import { bar } from "./bar.js";

let xyz = 1;

function foo() { 
  console.log(xyz);
  xyz++;

  bar();
}

export { foo };