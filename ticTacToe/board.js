// Class for the TTT board; internally represented as a 2-D Array.
class Board {
  static sideLength = 3;
  static maxSquare = Board.sideLength ** 2;
  static squareNums = Array.from( { length: Board.maxSquare }, (_, i) => i + 1);
  static centerSquare = Math.ceil(Board.maxSquare / 2);
  #grid;
  

  constructor() {
    this.#grid = Array.from(
      { length: Board.sideLength },
        () => Array.from( 
          { length: Board.sideLength }, 
          () => null,
        ),
    );
  }

  toString() {
    const colSeparator = '|';
    const rowSeparator = '---+---+---';

    return this.#grid.reduce((string, row, rowIndex) => {
      let stringRow = row.map((square, colIndex) => {
        let sqNum = this.#indexesToSquare(rowIndex, colIndex);
        return ` ${square ?? sqNum} `;
      }).join(colSeparator);

      string += `${stringRow}\n`;
      if (rowIndex < Board.sideLength - 1) string += `${rowSeparator}\n`;

      return string;
    }, '');
  }

  emptySquares() {
    return this.#grid.flat().reduce((memo, square, index) => { 
      if (square === null) memo.push(index + 1);

      return memo;
    }, []);
  }

  emptyAt(square) {
    if (this.#invalidSquare(square)) return false;

    let [ rowIndex, colIndex ] = this.#squareToIndexes(square);
    return this.#grid[rowIndex][colIndex] === null;
  }

  markAt(square, mark) {
    let [ rowIndex, colIndex ] = this.#squareToIndexes(square);
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

  linesFor(...squares) {
    if (squares.length === 0) squares = Board.squareNums;
    let sqNums = [...squares].flat();
    
    return sqNums.reduce((lines, sqNum) => {
      lines[sqNum] = this.#getLinesFor(sqNum);
      return lines;
    }, {});
  }

  #getLinesFor(square) {
    let [ rowIndex, colIndex ] = this.#squareToIndexes(square);
    let lines = [];
    
    // Row + Column
    lines.push(this.#gridRows()[rowIndex], 
               this.#gridColumns()[colIndex]);

    // Diagonal(s)
    let diagonals = this.#gridDiagonals();
    // TL -> BR
    if (rowIndex === colIndex) lines.push(diagonals[0]);
    // TR -> BL
    if (rowIndex + colIndex === Board.sideLength - 1) lines.push(diagonals[1]);

    return lines;
  }

  // Win Conditions
  #winningLine(lines) {
    return lines.find(line => {
      let firstInLine = line[0];

      return line.every(square => {
        return (square !== null) && (square === firstInLine);
      });
    });
  }

  #gridRows() {
    return this.#grid.map(row => row.slice());
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

  #squareToIndexes(square) {
    let sqNum = Number(square);

    let squareIndex = sqNum - 1;
    let rowIndex = Math.floor(squareIndex / Board.sideLength);
    let colIndex = squareIndex % Board.sideLength;

    return [rowIndex, colIndex];
  }

  #indexesToSquare(rowIndex, colIndex) {
    return (rowIndex * Board.sideLength) + colIndex + 1;
  }

  #invalidSquare(square) {
    let sqNum = Number(square);
    return Number.isNaN(sqNum) || sqNum < 1 || sqNum > Board.maxSquare;
  }
}

module.exports = Board;
