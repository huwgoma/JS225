// Class for each individual Card object
class Card {
  #suit;
  #face;

  constructor(suit, face) {
    this.#suit = suit;
    this.#face = face;
  }

  get suit() { return this.#suit }
  get face() { return this.#face }

  toString() {
    return `${this.face} of ${this.suit}`;
  }
}

module.exports = Card;