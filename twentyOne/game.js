const GameIO = require('./io');
const Deck = require('./deck');
const { Player, Dealer } = require('./participant');

// Game Class for Twenty-One
class Game {
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
  #players;
  #status

  constructor() {
    this.#deck = new Deck();

    let name = GameIO.getName();
    this.#player = new Player(name);
    this.#dealer = new Dealer(name);
    this.#players = [ this.#player, this.#dealer ];

    this.#dealStartingCards();
  }

  get players() { return this.#players.slice() }

  play() {
    // Clear Screen
    GameIO.displayHands(this.players);
    
    this.#playerTurn(); // loop until stay or bust; update gamestate before ending playerturn
    // // update gamestate
    // if (this.#status[this.#player].busted) { return };

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
    this.#players.forEach(player => {
      this.#dealTo(player, 2);
    });
  }

  #dealTo(player, cardCount = 1) {
    player.addToHand(this.#deck.draw(cardCount));
  }

  #playerTurn() {
    let playerMove;

    do {
      playerMove = GameIO.getPlayerMove();

      if (playerMove === 'H') this.#dealTo(this.#player);
      // if hit => draw 
      // 
      
      GameIO.displayHands(this.players);
    } while (playerMove === 'H'); // && !playerBusted
  }
}

module.exports = Game;

