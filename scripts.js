$(document).ready(function () {
    var deck = [];
    var playerHand = [];
    var dealerHand = [];

    function createDeck() {
        deck = []; // Start with an empty deck
        var suits = ["hearts", "diamonds", "clubs", "spades"]; // Define the four suits
        var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]; // Define the thirteen card values
        
        // For each suit...
        for(var i = 0; i < suits.length; i++) {
            // And each value...
            for(var j = 0; j < values.length; j++) {
                // Create a card with the current suit and value
                var card = {Value: values[j], Suit: suits[i]};
                
                // Add the card to the deck
                deck.push(card);
            }
        }
    }
    

    function shuffleDeck() {
        // Perform 1000 swaps to shuffle the deck
        for (var i = 0; i < 1000; i++) {
            // Pick two random locations in the deck
            var location1 = Math.floor((Math.random() * deck.length));
            var location2 = Math.floor((Math.random() * deck.length));
    
            // Store the card at the first location
            var tmp = deck[location1];
    
            // Swap the two cards
            deck[location1] = deck[location2];
            deck[location2] = tmp;
        }
    }
    

    function startGame() {
        // Clear the hands of the player and dealer
        playerHand = [];
        dealerHand = [];
    
        // Create a new deck of cards
        createDeck();
    
        // Shuffle the deck of cards
        shuffleDeck();
    
        // Deal two cards each to the player and dealer
        dealHands();
    
        // Update the displayed cards
        updateDeck();
    }
