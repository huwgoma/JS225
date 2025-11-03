const GameIO = require('./io');
const Deck = require('./deck');
const { Player, Dealer } = require('./participant');

// Game Class for Twenty-One
class Game {
  static #maxScore = 21;
  static #faceCardValues = { 'Ace': 1, 'Jack': 10, 'Queen': 10, 'King': 10 };

  static introduce() {
    console.log("Welcome to Twenty-One!");
    console.log(Game.rules);
  }

  static rules = "Twenty One is a 2-player card game, played between you and " +
    "a dealer. Each player starts with 2 cards in their hand. On your turn, " + 
    "you can choose to either hit to draw a card, or stay to end your turn. " +
    "After your turn is over, the dealer will hit until their hand totals at " +
    "least 17. Whoever has the higher hand total at that point wins." +
    "\n\nBe careful, though - if your hand total exceeds 21, you instantly lose!" +
    GameIO.horizontalRule;

  #deck;
  #player;
  #dealer;
  #state;

  constructor() {
    this.#deck = new Deck();

    let name = GameIO.getName();
    this.#player = new Player(name);
    this.#dealer = new Dealer(name);
    this.#state = new Map([ [this.#player, {} ], [this.#dealer, {}] ]);

    this.#dealStartingCards();
  }

  get players() { return [ this.#player, this.#dealer ] }

  play() {
    // Clear Screen
    GameIO.displayHands(this.players);
    
    this.#playerTurn(); // loop until stay or bust; update gamestate before ending playerturn
    
    if (this.playerState.busted)

    if (this.#state.get(this.#player).busted) { console.log('busted!')};

    // this.#dealerTurn();
    // // update gamestate

    // Player turn (do while)
    // -- update gamestate

    // unless state[player].busted? => dealer turn
    // -- update gamestate
  }

  announceResult() {
    // display game result based on end of game state
  }

  // Game Abstractions
  #dealStartingCards() {
    this.#dealTo(this.#player, 2);
    this.#dealTo(this.#dealer, 2);
  }

  #dealTo(player, cardCount = 1) {
    player.addToHand(this.#deck.draw(cardCount));
  }

  #playerTurn() {
    let playerMove;
    let handScore;

    do {
      playerMove = GameIO.getPlayerMove();
      if (playerMove === 'H') this.#dealTo(this.#player);

      handScore = this.#calculateHandScore(this.#player.hand);

      if (this.#isBusted(handScore)) { 
        this.#state.get(this.#player).busted = true;
        return;
      }

      GameIO.displayHands(this.players);
    } while (playerMove === 'H');

    this.#state.get(this.#player).score // new score

    // add interface methds for state
  }

  // Game State Helpers
  #playerState() {

  }

  // Calculation Helpers
  #calculateHandScore(hand) {
    let acePresent = false;

    let preAceScore = hand.reduce((score, card) => {
      let faceValue = card.face;
      if (faceValue === 'Ace') acePresent = true;

      score += Game.#faceCardValues[faceValue] || Number(faceValue);

      return score;
    }, 0);

    return (acePresent && preAceScore <= 11) ? preAceScore + 10 : preAceScore;
  }

  #isBusted(score) {
    return score > Game.#maxScore;
  }
}

module.exports = Game;

