// Class for the TTT board; internally represented as an Array.
// [ _, _, _,     [ 1, 2, 3, 
//   _, _, _,       4, 5, 6,
//   _, _, _, ]     7, 8, 9 ]

class Board {
  #grid;

  constructor(sideLength = 3) {
    this.#grid = Array.from({ length: sideLength ** 2 });
  }

  emptySquares() {
    return this.#grid.reduce((result, square, index) => {
      if (square === undefined) result.push(index + 1);
      return result;
    }, []);
  }

  emptyAt(square) {
    square = Number(square);
    if (Number.isNaN(square) || square < 1 || square > this.#grid.length) {
      return false;
    }

    return this.#grid[square - 1] === undefined;
  }
}

module.exports = Board;