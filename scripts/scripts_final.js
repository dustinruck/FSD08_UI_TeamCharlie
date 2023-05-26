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

// functions


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

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let randomCard = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomCard];
        deck[randomCard] = temp;
    }
    return deck;
}

function dealCard(hand, containerId) {
    let card = deck.pop();
    hand.push(card);
    displayCard(card, containerId);
    return card;
}

function displayCard(card, containerId) {
    let cardElement = `<div class="card ${card.suit == "♠︎" || card.suit == "♣︎" ? "black" : "red"}">
        <span class="top-left">${card.value}<br>${card.suit}</span>
        <span class="bottom-right">${card.value}<br>${card.suit}</span>
    </div>`;

    $(`#${containerId}`).append(cardElement);
}

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

function compare(playerScore, dealerScore) {
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

function resetGame() {
    $("#newGameButton").prop("disabled", false);
    $("#hitButton").prop("disabled", true);
    $("#standButton").prop("disabled", true);
    $('#bet').val("10");
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

    $("#newGameButton").click(function () {
        // Clean up the table
        $("#dealerCard").empty();
        $("#playerCard").empty();

        // Prepare for a new game
        $("#newGameButton").prop("disabled", true);
        $("#hitButton").prop("disabled", false);
        $("#standButton").prop("disabled", false);
        $("#cashOutButton").prop("disabled", false);
        createDeck();
        shuffleDeck();
        dealerHand = [];
        playerHand = [];
        $('#bet').val("10");
        indexDealer = 1;
        indexPlayer = 1;
        $('#mesBox').html("Welcome to Blackjack!<br>Click 'New Game' to Begin.");
        playerBalance = 100;
        $('#balance').html("You have : $" + playerBalance);


        // Deal the first two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        // Hide dealer's card
        //$("#dealerCard .card").last().addClass("hidden");

        // Deal the second two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        //update the score
        dealerScore = getTotal(dealerHand[0].value, dealerHand[1].value);
        playerScore = getTotal(playerHand[0].value, playerHand[1].value);

        // compare the first 2 cards value
        if (dealerScore > 21) {
            if (playerScore > 21) {
                $("#playerCard").append("<p>YOU BUSTED!</p>");
                $("#dealerCard").append("<p>DEALER BUSTED!</p>");
                $('#mesBox').html("DRAW! You and dealer both WENT OVER 21!<br>Click 'New Game' to Begin.");
                resetGame();
            } else {
                $("#playerCard").append("<p>YOU WIN!</p>");
                $("#dealerCard").append("<p>DEALER BUSTED!</p>");
                $('#mesBox').html("Congratulations! You win!<br>Dealer WENT OVER 21!<br>Click 'New Game' to Begin.");
                updateBet();
                playerBalance += betAmount;
                $('#balance').html("You have : $" + playerBalance);
                resetGame();
            }
        } else if (dealerScore < 21) {
            if (playerScore > 21) {
                $("#playerCard").append("<p>YOU BUSTED!</p>");
                $('#mesBox').html("DRAW! You WENT OVER 21!<br>Click 'New Game' to Begin.");
                updateBet();
                playerBalance -= betAmount;
                $('#balance').html("You have : $" + playerBalance);
                resetGame();
            } else if (playerScore == 21) {
                $("#playerCard").append("<p>BLACKJACK!</p>");
                $('#mesBox').html("Congratulations! You win! <br>You have Blackjack!<br>Click 'New Game' to Begin.");
                updateBet();
                playerBalance += betAmount;
                $('#balance').html("You have : $" + playerBalance);
                resetGame();
            } else {
                // ask the player to choose
                $('#mesBox').html("You have " + playerScore + ". Hit or Stand?");
            }
        } else {
            if (playerScore == 21) {
                $("#playerCard").append("<p>DRAW!</p>");
                $("#dealerCard").append("<p>DRAW!</p>");
                $('#mesBox').html("DRAW! You and dealer both have Blackjack!<br>Click 'New Game' to Begin.");
                resetGame();
            } else {
                $('#mesBox').html("Sorry! You lose. Dealer have Blackjack!<br>Click 'New Game' to Begin.");
                updateBet();
                playerBalance -= betAmount;
                $('#balance').html("You have : $" + playerBalance);
                resetGame();
            }
        }
        if (indexPlayer == 4) {
            comparecompare(playerScore, dealerScore);
            resetGame();
        }


    });

    function getNewCardValue() {
        newCardValue = getCardValue(playerHand[(indexPlayer + 1)].value);
        indexPlayer++;
    }

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

    $("#standButton").click(function () {
        $("#hitButton").prop("disabled", true);
        $("#standButton").prop("disabled", true);
        $("#dealerCard.card").last().removeClass("hidden");
        dealersTurn();

    })

        // Cash Out Button Event Listener
    $('#cashOutButton').on('click', function() {
        $('#cashOutTexts').text("You have cashed out $" + playerBalance + ". Thanks for playing!");
        $('#cashOutTexts').css('display', 'block');
        $('#cashOutButton').prop('disabled', true);
        $('#hitButton').prop('disabled', true);
        $('#standButton').prop('disabled', true);
        $('#newGameButton').prop('disabled', false);
    });
        // Reset the player's money to zero
        playerBalance = 0;
        $('#balance').html("You have : $" + playerBalance);
    // New Game Button Event Listener
    $('#newGameButton').on('click', function() {
        $('#cashOutTexts').css('display', 'none');
        $('#cashOutButton').prop('disabled', false);
        $('#newGameButton').prop('disabled', true);
    })


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
        resetGame();
    }


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
        resetGame();
    }
});

// problems
// balance reset to 100 when newgame button is clicked!!!
// when change bet, balance still calculate 10
