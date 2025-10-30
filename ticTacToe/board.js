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
    let winningLine = this.#winningLine(this.#gridRows()) ||
                      this.#winningLine(this.#gridColumns()) ||
                      this.#winningLine(this.#gridDiagonals());

    return winningLine ? winningLine[0] : null;
  }

  isFull() {
    return this.emptySquares().length === 0;
  }

  // Win Conditions
  #winningLine(lines) {
    return lines.find(line => {
      let firstInLine = line[0];

      return line.every(square => {
        return (square !== undefined) && (square === firstInLine);
      });
    });
  }

  #gridRows() {
    return this.#grid;
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
