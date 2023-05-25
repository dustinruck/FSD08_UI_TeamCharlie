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

        // Deal the first two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");

        // Hide dealer"s card
        $("#dealerCard .card").last().addClass("hidden");

        // Deal the second two cards
        dealCard(dealerHand, "dealerCard");
        dealCard(playerHand, "playerCard");
    });


    $("#hitButton").click(function () {
        dealCard(playerHand, "playerCard");
        let playerTotal = getTotal(playerHand);
        if (playerTotal > 21)
            endGame(false, "YOU'RE OVER 21!");
    })

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
        playerBalance = 0;
    })
});
