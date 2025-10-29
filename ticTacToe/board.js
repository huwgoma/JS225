// Class for the TTT board; internally represented as an Array.
// [ _, _, _,     [ 1, 2, 3, 
//   _, _, _,       4, 5, 6,
//   _, _, _, ]     7, 8, 9 ]

class Board {
  #grid = Array.from({ length: 9 });

  emptySquares() {
    return this.#grid.reduce((result, square, index) => {
      if (square === undefined) result.push(index + 1);
      return result;
    }, []);
  }
}

module.exports = Board;