// Class for the TTT board; internally represented as a 2-D Array.
class Board {
  static sideLength = 3;
  static maxSquare = Board.sideLength ** 2;
  #grid;

  constructor() {
    this.#grid = Array.from(
      { length: Board.sideLength },
      () => Array.from( { length: Board.sideLength } ),
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

  winningMark() {
    console.log(this.#gridColumns());
    console.log(this.#gridDiagonals());
    // Return 'X', 'O', or null
    // representing the mark with 3 in a row in any row/col/dia
    // check rows for any row with 3 of the same marker
    // >> all values === first value
    // repeat with cols and dias (transpose then check)
  }

  // Win Conditions
  #winningRow() {
    return this.#grid.find(row => {
      let firstValue = row[0];

      return row.every(square => { 
        return square !== undefined && (square === firstValue);
      });
    })
    // return the row with 3 of the same mark, or null if none
  }

  #gridColumns() {
    return this.#grid.map((row, rowIndex) => {
      return row.map((_col, colIndex) => {
        return this.#grid[colIndex][rowIndex];
      });
    });
  }

  #gridDiagonals() {
    const startPoints = [ [0, 0], [0, Board.sideLength - 1] ];
    return startPoints.map((point, index) => {
      let [ rowIndex, colIndex ] = point;
      let [ rowStep, colStep ]   = index === 0 ? [1, 1] : [1, -1];

      let diagonals = [];
      for (let i = 0; i < Board.sideLength; i++) {
        diagonals.push(this.#grid[rowIndex][colIndex]);
        rowIndex += rowStep;
        colIndex += colStep;
      }

      return diagonals;
    })
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
