// Player & Dealer Classes
class Participant {
  #name;
  #hand;

  constructor(name) {
    this.#name = name;
    this.#hand = [];
  }

  get hand() { return this.#hand.slice() }
  get name() { return this.#name }

  addToHand(...cards) {
    cards = cards.flat();

    cards.forEach(card => this.#hand.push(card));
  }
}

class Player extends Participant {
  
}

class Dealer extends Participant {
  constructor() {
    super('Dealer');
  }
}

module.exports = { Player, Dealer };