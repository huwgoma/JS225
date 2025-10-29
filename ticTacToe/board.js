// Class for the TTT board; internally represented as an Array.
// [ _, _, _,     [ 1, 2, 3, 
//   _, _, _,       4, 5, 6,
//   _, _, _, ]     7, 8, 9 ]

class Board {
  static sideLength = 3;
  #grid;

  constructor() {
    this.#grid = Array.from({ length: Board.sideLength ** 2 });
  }

  draw() {
    const colSeparator = '|';
    const rowSeparator = '---+---+---';
    let row = [];

    console.log("\n");

    this.#grid.forEach((square, index) => {
      let squareNumber = index + 1;
      let squareContents = square ?? squareNumber;
      row.push(` ${squareContents} `);

      if (squareNumber % Board.sideLength === 0) {
        console.log(row.join(colSeparator));
        if (squareNumber < this.#grid.length) console.log(rowSeparator);
        row.length = 0;
      }
    });

    console.log("\n");
  }

  emptySquares() {
    return this.#grid.reduce((result, square, index) => {
      if (square === undefined) result.push(index + 1);
      return result;
    }, []);
  }

  emptyAt(square) {
    if (!this.#squareIsValid(Number(square))) return false;

    return this.#grid[square - 1] === undefined;
  }

  markAt(square, mark) {
    this.#grid[square - 1] = mark;
  }

  #squareIsValid(square) {
    return !(Number.isNaN(square)) && 
      square >= 1 && square <= this.#grid.length;
  }
}

module.exports = Board;