// Player & Dealer Classes
class Participant {
  #name;
  #hand;

  constructor(name) {
    this.#name = name;
    this.#hand = [];
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