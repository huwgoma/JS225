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

  getMove(emptySquares) {
    // Randomly select move for now
    let randomIndex = Math.floor((Math.random() * emptySquares.length));
    return emptySquares[randomIndex];
  }
}

module.exports = { HumanPlayer, ComputerPlayer };