// js for the blackjack.html file
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerBalance = 100;
let betAmount = 0;
let indexDealer = 1;
let indexPlayer = 1;
let newCardValue;

// pops up a age verification when loading the page
document.getElementById('verifyButton').addEventListener('click', function () {
    // Hide the modal and show the main content when the button is clicked
    document.getElementById('ageVerificationModal').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
});

// functions
/**
 * Creates a new deck of cards by combining card numbers and suits
 * {Array} The deck of cards
 */
function createDeck() {
    let cardNums = ["A", "K", "Q", "J", "10", "9", "8", "7",
        "6", "5", "4", "3", "2"];
    let suits = ["♥︎", "♦︎", "♠︎", "♣︎"];
    for (let i = 0; i < cardNums.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = new Card(cardNums[i], suits[j]);

            deck.push(card);
        }
    }
    return deck;
}

/**
 * Shuffles the deck of cards randomly
 * @returns {Array} The shuffled deck of cards
 */
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let randomCard = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomCard];
        deck[randomCard] = temp;
    }
    return deck;
}

/**
 * Deals a card from the deck to the specified hand and displays it on the UI
 * @param {Array} hand - The hand to which the card is dealt
 * @param {string} containerId - The ID of the container element where the card will be displayed
 * @returns {Object} The dealt card
 */
function dealCard(hand, containerId) {
    let card = deck.pop();
    hand.push(card);
    displayCard(card, containerId);
    return card;
}

/**
 * Displays a card on the UI
 * @param {Object} card - The card object to be displayed
 * @param {string} containerId - The ID of the container element where the card will be appended
 */
function displayCard(card, containerId) {
    let cardElement = `<div class="card ${card.suit == "♠︎" || card.suit == "♣︎" ? "black" : "red"}">
        <span class="top-left">${card.value}<br>${card.suit}</span>
        <span class="bottom-right">${card.value}<br>${card.suit}</span>
    </div>`;
    $(`#${containerId}`).append(cardElement);
}

/**
 * Retrieves the numerical value of a card
 * @param {string} card - The rank of the card (e.g., "A", "K", "Q", "J", "10", "9", etc.)
 * @returns {number} - The numerical value of the card
 */
function getCardValue(card) {
    let cardValue = 0;
    if (card == "A") {
        cardValue = 1;
    } else if (card == "K" || card == "Q" || card == "J") {
        cardValue = 10;
    } else {
        cardValue = parseInt(card);
    }
    return cardValue;
}

/**
 * Calculates the total value of two cards
 * @param {(string|number)} card1 - The rank of the first card or the total value of the cards on the hand
 * @param {string} card2 - The rank of the second card
 * @returns {number} - The total value of the two cards
 */
function getTotal(card1, card2) {
    let sumCards = 0;
    let card1Value;
    let card2Value = getCardValue(card2);
    if (isNaN(card1)) {
        card1Value = getCardValue(card1);
        if (card1Value === 1 && card2Value !== 1) {
            sumCards = 11 + card2Value;
        }
        else if (card1Value !== 1 && card2Value === 1) {
            sumCards = 11 + card1Value;
        }
        else if (card1Value !== 1 && card2Value !== 1) {
            sumCards = card1Value + card2Value;
        }
        else {
            sumCards = 21;
        }
    } else {
        card1Value = parseInt(card1);
        if (card2Value === 1) {
            if (card1Value <= 10) {
                sumCards = 11 + card1Value;
            } else {
                sumCards = 1 + card1Value;
            }
        } else {
            sumCards = card1Value + card2Value;
        }
    }
    return sumCards;
}

function updateBet() {
    betAmount = parseInt($('#bet').val());
}

/**
 * Compares the scores of the player and the dealer and determines the outcome
 * Updates the bet amount and player balance accordingly
 * Resets the game after displaying the result
 */
function compare(playerScore, dealerScore) {

    updateBet();

    if (playerScore == 21) {
        if (dealerScore == 21) {
            $('#mesBox').html("DRAW! You and dealer both have Blackjack!<br>Click 'New Game' to Begin.");
            resetGame();
        }
        else {
            $('#mesBox').html("Congratulations! You win!<br>You have Blackjack!<br>Click 'New Game' to Begin.");
            updateBet();
            playerBalance += betAmount;
            resetGame();
        }
    } else if (playerScore < 21) {
        if (dealerScore == 21) {
            $('#mesBox').html("Sorry! You lose. Dealer have Blackjack!<br>Click 'New Game' to Begin.");
            updateBet();
            playerBalance -= betAmount;
            resetGame();
        }
        else if (dealerScore > 21) {
            $('#mesBox').html("Congratulations! You win!<br>DEALER WENT OVER 21!!<br>Click 'New Game' to Begin.");
            updateBet();
            playerBalance += betAmount;
            resetGame();
        }
        else {
            if (playerScore < dealerScore) {
                $('#mesBox').html("Sorry! You lose. You have " + playerScore + ". Dealer has " + dealerScore + "." + "<br> Click 'New Game' to Begin.")
                updateBet();
                playerBalance -= betAmount;
                resetGame();
            }
            else if (playerScore === dealerScore) {
                $('#mesBox').html("DRAW! You and dealer both have " + playerScore + "<br>Click 'New Game' to Begin.");
                resetGame();
            }
            else {
                $('#mesBox').html("Congratulations! You win! <br> You have " + playerScore + ". Dealer has " + dealerScore + "." + "<br> Click 'New Game' to Begin.")
                updateBet();
                playerBalance += betAmount;
                resetGame();
            }
        }
    } else {
        if (dealerScore > 21) {
            $('#mesBox').html("DRAW! You and dealer both WENT OVER 21!<br>Click 'New Game' to Begin.");
            resetGame();
        } else {
            $('#mesBox').html("Sorry! You lose. YOU WENT OVER 21!!<br>Click 'New Game' to Begin.");
            updateBet();
            playerBalance -= betAmount;
            resetGame();
        }
    }
}

/**
    * Retrieves the value of a new card from the player's hand and increments the indexPlayer variable
    */
function getNewCardValue() {
    newCardValue = getCardValue(playerHand[(indexPlayer + 1)].value);
    indexPlayer++;
}

/**
     * Controls the dealer's turn in the game
     * Deals cards to the dealer until their score is less than or equal to 16 or the maximum number of cards has been reached
     * Compares the player's and dealer's scores to determine the outcome
     * Updates the player balance and displays it
     */
function dealersTurn() {
    while (dealerScore <= 16 && indexDealer < 4) {
        dealCardToDealer(indexDealer);
        indexDealer++;
    }

    if (dealerScore > 21) {
        $('#mesBox').html("Congratulations! You win! <br>Dealer WENT OVER 21!<br>Click 'New Game' to Begin.");
        playerBalance += parseInt($('#bet').val());
    } else {
        compare(playerScore, dealerScore);
    }
    $('#balance').html("You have : $" + playerBalance);
}

/**
 * Deals a card to the dealer's hand.
 * Calculates the value of the new card.
 * Updates the dealer's score and the player's balance.
 */
function dealCardToDealer(indexDealer) {
    dealCard(dealerHand, "dealerCard");

    let newCardValue = getCardValue(dealerHand[(indexDealer + 1)].value);
    // alert(newCardValue);
    if (newCardValue === 1) {
        if (dealerScore < 10) {
            newCardValue = 11;
        } else if (dealerScore === 10) {
            $('#mesBox').html("Sorry! You lose. Dealer have Blackjack!<br>Click 'New Game' to Begin.");
            playerBalance -= $('#bet').val();

        } else {
            newCardValue = 1;
        }
    }
    dealerScore += newCardValue;

    $('#balance').html("You have : $" + playerBalance);
}

function resetGame() {
    $("#newGameButton").prop("disabled", false);
    $("#hitButton").prop("disabled", true);
    $("#standButton").prop("disabled", true);
}

/**
 * gameover after run out of the balance or cash out
 */
function endGame() {
    $("#newGameButton").prop("disabled", false);
    $("#hitButton").prop("disabled", true);
    $("#standButton").prop("disabled", true);
    $("#cashOutButton").prop("disabled", true);
    playerBalance = 0;
    $('#balance').html("You have : $" + playerBalance);
    $('#mesBox').html("Welcome to Blackjack!<br>Click 'New Game' to Begin.");
    $('#bet').val("10");
    $("#dealerCard").empty();
    $("#playerCard").empty();
}

$(document).ready(function () {

    // click rules button to display and hide the rules
    let rulesText = document.getElementById("rulesText");
    document.getElementById("showRulesButton").addEventListener("click", function () {
        if (rulesText.style.display === "block") {
            rulesText.style.display = "none";
        } else {
            rulesText.style.display = "block";
        }
    });

    // newGameButton clicked to start the game
    $("#newGameButton").click(function () {
        // Clean up the table
        $("#dealerCard").empty();
        $("#playerCard").empty();

        // Prepare for a new game:
        $("#newGameButton").prop("disabled", true); // active the hit stand and cashout button
        $("#hitButton").prop("disabled", false);
        $("#standButton").prop("disabled", false);
        $("#cashOutButton").prop("disabled", false);
        createDeck(); // create and shuffle the deck
        shuffleDeck();
        dealerHand = []; // clear the cards in hand
        playerHand = [];
        $('#bet').val("10"); // reset the bet to 10
        indexDealer = 1;
        indexPlayer = 1;
        $('#mesBox').html("Welcome to Blackjack!<br>Click 'New Game' to Begin."); // reset the message box
        $('#balance').html("You have : $" + playerBalance); // update the balance

        // Deal the first two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        // Hide dealer's card
        $("#dealerCard .card").first().addClass("hidden");

        // Deal the second two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        //update the score
        dealerScore = getTotal(dealerHand[0].value, dealerHand[1].value);
        playerScore = getTotal(playerHand[0].value, playerHand[1].value);

        // compare the first 2 cards value, let the player to choose if no one is 21 or bust
        if (dealerScore < 21 && playerScore < 21) {
            // ask the player to choose
            $('#mesBox').html("You have " + playerScore + ". Hit or Stand?");
        } else {
            compare(playerScore, dealerScore);
            resetGame();
        }

        if (indexPlayer == 4) {
            compare(playerScore, dealerScore);
            resetGame();
        }

        if (playerBalance <= 0) {
            alert("You've run out of money!!! See you next time!!");
            endGame();
        }


    });

    // event listener for bet input change
    $('#bet').on('input', function () {
        // Get the current value of the input
        betAmount = parseInt($(this).val());
        if (betAmount < playerBalance) {
            alert("You don't have enough money, please change your bet!");
            //$('#bet').val("10");
        } else if (isNaN(betAmount) || betAmount <= 0) {
            alert("Invalid bet!");
            //$('#bet').val("10");
        }
    });

    // event listener for hitButton
    $("#hitButton").click(function () {
        dealCard(playerHand, "playerCard");
        getNewCardValue();
        playerScore = getTotal(playerScore, newCardValue);
        if (playerScore >= 21) {
            compare(playerScore, dealerScore);
            $('#balance').html("You have : $" + playerBalance);
        } else {
            $('#mesBox').html("You have " + playerScore + ". Hit or Stand?");
        }
        $('#balance').html("You have : $" + playerBalance);
    });

    // event listener for standButton
    $("#standButton").click(function () {
        $("#hitButton").prop("disabled", true);
        $("#standButton").prop("disabled", true);
        $("#dealerCard .card").first().removeClass("hidden");
        dealersTurn();

    })

    // event listener for cashoutButton
    $('#cashOutButton').on('click', function () {
        $('#cashOutTexts').text("You have cashed out $" + playerBalance + ". Thanks for playing!");
        $('#cashOutTexts').css('display', 'block');
        $('#cashOutButton').prop('disabled', true);
        $('#hitButton').prop('disabled', true);
        $('#standButton').prop('disabled', true);
        $('#newGameButton').prop('disabled', false);
        playerBalance = 100;
    });

    // New Game Button Event Listener
    $('#newGameButton').on('click', function () {
        $('#cashOutTexts').css('display', 'none');
        $('#cashOutButton').prop('disabled', false);
        $('#newGameButton').prop('disabled', false);
    })


});

// problems
// Bet button is only reading 10 and reset to 10
// Ace 1 or 11 logic not always working
