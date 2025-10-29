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
  // Inherit default constructor()
}

class ComputerPlayer extends Player {
  constructor(mark) {
    super('CPU', mark);
  }
}

module.exports = { HumanPlayer, ComputerPlayer };