const shuffle = require('shuffle-array');
const Card = require('./card');

// Class for Card Deck
class Deck {
  static #suits = ['♠', '♥','♦', '♣'];
  static #faces = [
    'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King'
  ]

  #cards = [];

  constructor(shuffle = true) {
    this.#addCards();
    if (shuffle) this.#shuffle();
  }

  #addCards() {
    Deck.#suits.forEach(suit => {
      Deck.#faces.forEach(face => {
        this.#cards.push(new Card(suit, face));
      });
    });
  }

  #shuffle() {
    shuffle(this.#cards);
  }
}

module.exports = Deck;