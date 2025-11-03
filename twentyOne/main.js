// Twenty-One
const Game = require('./game');

Game.introduce();
let game = new Game();

game.play();
game.announceResult();



// Twenty-One is a card game that is played by 2 participants - a 'player' and a 'dealer'.
// - Both players are dealt 2 cards initially 
// - The player can see both of their cards but only one of the dealer's cards
// Objective: Get a score higher than the dealer's score, but lower than 21

// == Game Flow ==
// --- Player Turn ---
// * Always happens at least once; continues until the player either chooses stay, or they hit and bust
// >> while (playerChoice === 'hit' && !isBusted(player.hand))

// -- Ask the player for their choice (hit or stay)
// -- If hit, draw from deck and add to player hand
// -- recalculate the player's hand total as part of the exit condition (isBusted(player.hand))

// when the player's turn ends, capture their part of the game state:
// -- playerBusted = true/false; playerScore = handValue(player.hand)
// Game State Representation?
// { player: { busted: true, score: 22 } }
// where player is the same player object created earlier

// If gameState.playerBusted !== true, start dealer turn:

// --- Dealer Turn ---
// while (handValue(dealer.hand) <= 17)
// draw from deck and add to dealer hand

// -- dealerBusted = true/false; dealerScore = handValue(dealer.hand)

// --- End of Game ---
// If playerBusted === true => "You went over 21 and busted, so you lose"
// If dealerBusted === true => "The dealer went over 21 and busted, so you win"
// Otherwise, compare playerScore with dealerScore and log an appropriate message
// 


// player can either hit (draw) or stay (pass)
// while (player turn) 
// - get input -> hit or stay
// - if hit -> draw -> end player turn if busted (over 21)
// - if stay -> player turn === false

// if player.busted => skip to end 

// otherwise:
// - dealer's turn:
// -- dealer must hit until their hand totals at least 17


// Classes:
// - Game   (Manages a single game/round)
// >> Introduces the rules 
// >> Gets the player's name
// >> Creates the players, deck, and deals 2 initial cards to each player's hand
// >> Print display (show all cards in player hand, show top card in dealer hand)

// - Player -> Actual Player and Dealer
// >> Has a name and a hand

// - Hand   (Represents the player's hand)
// >> Contains an array of the cards in the hand
// 
// - Deck   (Contains 52 cards)
// >> Creates all 52 cards on initialization
// >> shuffle -> shuffles the deck (mutates)
// >> draw -> take and return the last card from the deck (mutates)

// - Card   (Suite + Face Value)
// >> State-only class (suite + face value)
// 