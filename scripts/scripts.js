// Function Cashout-lhb
var player = {
    money: 100
};

function cashOut() {
    // Calculate the player's winnings
    var winnings = player.money;

    // Reset the player's money to zero
    player.money = 0;

    // Provide a message to the user
    alert("You have cashed out $" + winnings + ". Thanks for playing!");
}

// Add the event listener for the "Cash Out" button
document.getElementById("cashout-button").addEventListener("click", cashOut);

// Function shuffle-lhb 
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

// Function hit-lhb
function hit() {
 standButton.disabled = true;
 hitButton.disabled = true;
 dealCard(playerCards, function() {
    var playerTotal = getTotal(playerCards);
    if (playerTotal > 21)
       endGame(false, "YOU WENT OVER 21!");
    else if (playerCards.count == 5)
       endGame(true, "You took 5 cards without going over 21.");
    else if (playerTotal == 21)
       dealersTurnAndEndGame();
    else {
       message.innerHTML = "You have " + playerTotal + ". Hit or Stand?";
       hitButton.disabled = false;
       standButton.disabled = false;
    }
 });
}

// Function stand-lhb
function stand() {

 hitButton.disabled = true;
 standButton.disabled = true;
 dealersTurnAndEndGame();
}

// Function caculate total value of dealer and player cards-lhb
function getTotal(hand) {
    var total = 0;
    var ace = false;
    for (var i = 0; i < hand.length; i++) { // using array length to iterate through hand
        var cardValue = hand[i].value;
        if (cardValue === 1) { // if card is an ace
            ace = true;
            total += 11; // consider ace as 11 by default
        } else if (cardValue > 10) { // if card is J, Q, or K
            total += 10; // J, Q, K are considered as 10
        } else { 
            total += cardValue; // otherwise, add the card value to total
        }
    }
    if (ace && total > 21) { // if there is an ace and total is over 21
        total -= 10; // consider ace as 1 instead of 11
    }
    return total;
}