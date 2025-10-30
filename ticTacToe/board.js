// Class for the TTT board; internally represented as a 2-D Array.
class Board {
  static sideLength = 3;
  static maxSquare = Board.sideLength ** 2;
  #grid;

  constructor() {
    this.#grid = Array.from(
      { length: Board.sideLength },
      row => Array.from( { length: Board.sideLength }),
    );
  }

  draw() {
    const colSeparator = '|';
    const rowSeparator = '---+---+---';
    let squareNum = 1;

    this.#grid.forEach((row, rowIndex) => {
      console.log(
        row.map(square => {
          let squareValue = square ?? squareNum;
          squareNum++;
          
          return ` ${squareValue} `;
        }).join(colSeparator)
      );

      if (rowIndex < Board.sideLength - 1) console.log(rowSeparator);
    });

    console.log("\n");
  }

  emptySquares() {
    return this.#grid.flat().reduce((memo, square, index) => { 
      if (square === undefined) memo.push(index + 1);

      return memo;
    }, []);
  }

  emptyAt(square) {
    if (this.#invalidSquare(square)) return false;

    let [ rowIndex, colIndex ] = this.#squareToIndex(square);
    return this.#grid[rowIndex][colIndex] === undefined;
  }

  markAt(square, mark) {
    let [ rowIndex, colIndex ] = this.#squareToIndex(square);
    this.#grid[rowIndex][colIndex] = mark;
  }

  #squareToIndex(square) {
    let sqNum = Number(square);

    let squareIndex = sqNum - 1;
    let rowIndex = Math.floor(squareIndex / Board.sideLength);
    let colIndex = squareIndex % Board.sideLength;

    return [rowIndex, colIndex];
  }


  #invalidSquare(square) {
    let sqNum = Number(square);
    return Number.isNaN(sqNum) || sqNum < 1 || sqNum > Board.maxSquare;
  }
}

module.exports = Board;
