const GameIO = require('./io');
const Deck = require('./deck');

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
    "\n========================================================================";

  constructor() {
    let name = GameIO.getName();
    this.deck = new Deck();

    
    // Prompt for player name
    // Create shuffled deck
    // Create player + dealer
    // Deal 2 cards to each player
  }

  play() {
    // Clear screen + display cards
    // Player turn (do while)
    // -- update gamestate

    // unless state[player].busted? => dealer turn
    // -- update gamestate
  }

  announceResult() {
    // display game result based on end of game state
  }
}

module.exports = Game;

