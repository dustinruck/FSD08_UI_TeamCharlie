// js for the blackjack.html file


class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

// let playerHand = [];
// let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerBalance = 100;
let betAmount = 0;
// let indexDealer = 1;
// let indexPlayer = 1;

// functions


function createDeck() {
    let cardNums = ["A", "K", "Q", "J", "10", "9", "8", "7",
        "6", "5", "4", "3", "2"];
    let suits = ["♥︎", "♦︎", "♠︎", "♣︎"];
    let deck = [];
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

function dealCard(deck, hand, containerId) {
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

function getTotal(hand) {
    let hasAce = false;
    let sumCards = 0;
    for(let i = 0; i < hand.length; i++) {
        sumCards += getCardValue(hand[i].value);
        if(hand[i].value == "A") {
            hasAce = true;
        }
    }
    if(hasAce && sumCards <= 11) {
        sumCards += 10;
    }
    return sumCards;
}


function compare(playerScore, dealerScore) {
    if (playerScore == 21) {
        if (dealerScore == 21) {
            $('#mesBox').html("DRAW! You and dealer both have Blackjack!<br>Click 'New Game' to Begin.");
            resetGame();
        }
        else {
            $('#mesBox').html("Congratulations! You win! You have Blackjack!<br>Click 'New Game' to Begin.");
            playerBalance += parseInt($('#bet').val());
            resetGame();
        }
    } else if (playerScore < 21) {
        if (dealerScore == 21) {
            $('#mesBox').html("Sorry! You lose. Dealer have Blackjack!<br>Click 'New Game' to Begin.");
            playerBalance -= parseInt($('#bet').val());
            resetGame();
        }
        else if (dealerScore > 21) {
            $('#mesBox').html("Congratulations! You win! DEALER WENT OVER 21!!<br>Click 'New Game' to Begin.");
            playerBalance += parseInt($('#bet').val());
            resetGame();
        }
        else {
            if (playerScore < dealerScore) {
                $('#mesBox').html("Sorry! You lose. You have " + playerScore + ". Dealer has " + dealerScore + "." + "<br> Click 'New Game' to Begin.")
                playerBalance -= parseInt($('#bet').val());
                resetGame();
            }
            else if (playerScore = dealerScore) {
                $('#mesBox').html("DRAW! You and dealer both have " + playerScore + "<br>Click 'New Game' to Begin.");
                resetGame();
            }
            else {
                    $('#mesBox').html("Congratulations! You win! You have " + playerScore + ". Dealer has " + dealerScore + "." + "<br> Click 'New Game' to Begin.")
                    playerBalance += betAmount; // Update the balance
                resetGame();
            }
        }
    } else {
        if (dealerScore > 21) {
            $('#mesBox').html("DRAW! You and dealer both WENT OVER 21!<br>Click 'New Game' to Begin.");
            resetGame();
        } else {
            $('#mesBox').html("Sorry! You lose. YOU WENT OVER 21!!<br>Click 'New Game' to Begin.");
            playerBalance -= betAmount; // Update the balance
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

    let deck = [];
    let playerHand = [];
    let dealerHand = [];

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
        betAmount = parseInt($('#bet').val());
        indexDealer = 1;


        // Deal the first two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        // Hide dealer's card
        $("#dealerCard .card").last().addClass("hidden");

        // Deal the second two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        //update the score
        dealerScore = getTotal(dealerHand);
        playerScore = getTotal(playerHand);


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
                $('#mesBox').html("Congratulations! You win! <br>Dealer WENT OVER 21!<br>Click 'New Game' to Begin.");
                playerBalance += parseInt($('#bet').val());
                resetGame();
            }
        } else if (dealerScore < 21) {
            if (playerScore > 21) {
                $("#playerCard").append("<p>YOU BUSTED!</p>");
                $('#mesBox').html("DRAW! You WENT OVER 21!<br>Click 'New Game' to Begin.");
                playerBalance -= $('#bet').val();
                resetGame();
            } else if (playerScore == 21) {
                $("#playerCard").append("<p>BLACKJACK!</p>");
                $('#mesBox').html("Congratulations! You win! You have Blackjack!<br>Click 'New Game' to Begin.");
                playerBalance += parseInt($('#bet').val());
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
                playerBalance -= $('#bet').val();
                resetGame();
            }
        }
    });

    
    $("#hitButton").click(function () {
        dealCard(playerHand, "playerCard");
        indexPlayer++;
        playerScore = getTotal(playerScore, playerHand[indexPlayer + 1].value);
        if (playerScore >= 21) {
            compare(playerScore, dealerScore);
            $('#balance').html("You have : $" + playerBalance);
        } 
        $('#mesBox').html("You have " + playerScore + ". Hit or Stand?");
    });

    $("#standButton").click(function () {
        $("#hitButton").prop("disabled", true);
        $("#standButton").prop("disabled", true);
        $("#dealerCard .card").last().removeClass("hidden");
        dealersTurn();

    })

    $("#cashOutButton").click(function () {
        $("#newGameButton").prop("disabled", false);
        $("#hitButton").prop("disabled", true);
        $("#standButton").prop("disabled", true);
        $("#cashOutButton").prop("disabled", true);
        alert("You have cashed out $" + playerBalance + ". Thanks for playing!");
        // Reset the player's money to zero
        playerBalance = 100;
        $('#balance').html("You have : $" + playerBalance);
    })


    function dealersTurn() {
        $('#dealerCard .card').removeClass('hidden');
        dealerScore = getTotal(dealerHand); // Adjusted to get the total score of the dealer
        while (dealerScore < 17) {
            dealCard(dealerHand, "dealerCard");
            dealerScore = getTotal(dealerHand); // Update dealer score after each new card
        }
        if (dealerScore > 21) {
            playerBalance += betAmount;
        } else {
            compare(playerScore, dealerScore);
        }
        $('#balance').html("You have : $" + playerBalance);
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
        console.log(dealerScore);
        $('#balance').html("You have : $" + playerBalance);
        resetGame();
    }
    $('#balance').html("You have : $" + playerBalance);
});

// problems
// balance reset to 100 when newgame button is clicked!!!
// when change bet, balance still calculate 10
