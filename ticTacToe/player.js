class Player {
  #name;
  #mark;

  constructor(name, mark) {
    this.#name = name;
    this.#mark = mark;
  }

  get name() { return this.#name }
  get mark() { return this.#mark }
}

class HumanPlayer extends Player {
  #moveLogic;

  constructor(name, mark, moveLogic) {
    super(name, mark);
    this.#moveLogic = moveLogic;
  }
  
  getMove() {
    return this.#moveLogic();
  }
}

class ComputerPlayer extends Player {
  constructor(mark) {
    super('CPU', mark);
  }

  getMove(board) {
    let emptySquares = board.emptySquares();
    let prioritySquares = this.#scanPriorities(board.linesFor(emptySquares));
    let centerSquare = this.#scanCenter(board.constructor.centerSquare, emptySquares);

    return prioritySquares.offense || 
           prioritySquares.defense ||
           centerSquare || 
           this.#randomSquare(emptySquares);
  }

  // CPU Move Logic
  #scanPriorities(openLines) {
    let priorities = {};

    Object.keys(openLines).forEach(square => {
      let lines = openLines[square];

      // Must attack
      if (lines.some(this.#mustAttack, this)) {
        priorities.offense = Number(square);
      // Must defend
      } else if (lines.some(this.#mustDefend, this)) {
        priorities.defense = Number(square);
      }
    });

    return priorities;
  }

  #mustAttack(line) {
    // Line has 2 CPU-marked squares and 1 empty square
    return line.filter(square => square === this.mark).length === 2 &&
           line.filter(square => square === null).length === 1;
  }

  #mustDefend(line) {
    // Line has exactly 1 empty square and 0 CPU-marked squares
    return line.filter(square => square === null).length === 1 &&
           line.filter(square => square === this.mark).length === 0;
  }

  #scanCenter(centerSquare, emptySquares) {
    return emptySquares.find(square => square === centerSquare) || null;
  }

  #randomSquare(emptySquares) {
    let randomIndex = Math.floor(Math.random() * emptySquares.length);

    return emptySquares[randomIndex];
  }
}

module.exports = { HumanPlayer, ComputerPlayer };
