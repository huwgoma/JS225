const Card = require('./card');

// Class for Card Deck
class Deck {
  static #suits = ['♠', '♥','♦', '♣'];
  static #faces = [
    'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King'
  ]

  #cards = [];

  constructor() {
    this.#addCards();
    // shuffle  
  }

  #addCards() {
    Deck.#suits.forEach(suit => {
      Deck.#faces.forEach(face => {
        this.#cards.push(new Card(suit, face));
      });
    });
  }

  #shuffle() {
    
  }
}

module.exports = Deck;