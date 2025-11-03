const GameIO = require('./io');
const Deck = require('./deck');
const { Player, Dealer } = require('./participant');

// Game Class for Twenty-One
class Game {
  static #bustLimit = 21;
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
    this.#dealer = new Dealer();
    this.#state = { };

    this.#dealStartingCards();
  }

  get players() { return [ this.#player, this.#dealer ] }

  play() {
    GameIO.updateDisplay(this.players);
    
    this.#playerTurn();
    
    if (this.#isBusted(this.#player)) {
      this.#setEndgameState();
      return;
    }

    GameIO.updateDisplay(this.players, false);
    
    this.#dealerTurn();

    // End of Game
    this.#setEndgameState();
  }

  announceResult() {
    if (this.#state.busted) { 
      console.log(`${this.#state.busted.name} went over ${Game.#bustLimit} and busted!`);
      console.log(`${this.#state.winner.name} wins by default!`);
    } else if (this.#state.tie) {
      console.log(`It's a tie, ${this.#state.dealerScore}-${this.#state.playerScore}!`);
    } else { 
      console.log(`${this.#state.winner.name} wins, ${this.#state.dealerScore}-${this.#state.playerScore}!`);
    }
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

      if (handScore > Game.#bustLimit) this.#state.busted = this.#player;

      GameIO.updateDisplay(this.players);
    } while (playerMove === 'H' && !(this.#isBusted(this.#player)));

    this.#state.playerScore = handScore;
  }

  #dealerTurn() {
    console.log("Dealer's turn...");

    let handScore = this.#calculateHandScore(this.#dealer.hand);

    while (handScore <= 17 && !(this.#isBusted(this.#dealer))) {
      this.#dealTo(this.#dealer);
      handScore = this.#calculateHandScore(this.#dealer.hand);

      if (handScore > Game.#bustLimit) this.#state.busted = this.#dealer;
    }
    
    GameIO.updateDisplay(this.players, false)
    this.#state.dealerScore = handScore;
  }

  #setEndgameState() {
    if (this.#state.busted) { 
      this.#state.loser  = this.#state.busted;
      this.#state.winner = this.#findOtherPlayer(this.#state.loser);
    } else if (this.#state.playerScore === this.#state.dealerScore) {
      this.#state.tie = true;
    } else {
      this.#state.winner = this.#state.playerScore > this.#state.dealerScore ? this.#player : this.#dealer;
      this.#state.loser  = this.#findOtherPlayer(this.#state.winner);
    }
  }

  // Other Helpers
  #findOtherPlayer(player) {
    return this.players.find(otherPlayer => otherPlayer !== player);
  }

  #isBusted(player) {
    return this.#state.busted === player;
  }

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
}

module.exports = Game;

