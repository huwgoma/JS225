function timed(func) {
  // time
  func();
  // time
  console.log('x time has passed')
}


function loopy() {
  let sum = 0;
  let i;

  for (i = 1; i <= 1000000000; i += 1) {
    sum += i;
  }

  console.log(sum);
}

timed(loopy)

let timedLoop = timed(loopy)