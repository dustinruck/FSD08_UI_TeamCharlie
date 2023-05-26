

let deck = [];
let playerHand = [];
let dealerHand = [];

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}


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
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let randomCard = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[randomCard];
        deck[randomCard] = temp;
    }
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
        cardValue = 11;
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
    if(hasAce && sumCards > 21) {
        sumCards -= 10;
    }
    return sumCards;
}

function compare() {
    if (playerScore > 21) {
        return -1;
    }
    if (dealerScore > 21) {
        return 1;
    }
    if (playerScore > dealerScore) {
        return 1;
    }
    if (playerScore < dealerScore) {
        return -1;
    }
    return 0;
}

function resetGame() {
    $("#newGameButton").prop("disabled", false);
    $("#hitButton").prop("disabled", true);
    $("#standButton").prop("disabled", true);
    deck = [];
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    $("#dealerCard").empty();
    $("#playerCard").empty();
    $('#mesBox').html("");
}

$(document).ready(function () {
    $("#hitButton").prop("disabled", true);
    $("#standButton").prop("disabled", true);

    $("#newGameButton").click(function () {
        $("#dealerCard").empty();
        $("#playerCard").empty();
        deck = createDeck();
        deck = shuffleDeck(deck);

        betAmount = parseInt($('#bet').val());
\
        // Deal the second two cards
        dealCard(playerHand, "playerCard");
        dealCard(dealerHand, "dealerCard");

        playerScore = getTotal(playerHand);
        dealerScore = getTotal(dealerHand);

        $('#mesBox').html("You have " + playerScore + ". Hit or Stand?");
    });

    $("#hitButton").click(function () {
        dealCard(playerHand, "playerCard");
        playerScore = getTotal(playerHand);
        $('#mesBox').html("You have " + playerScore + ". Hit or Stand?");
        if (playerScore >= 21) {
            let result = compare();
            if(result == 1) {
                $('#mesBox').html("You Win!");
                playerBalance += betAmount;
            } else {
                $('#mesBox').html("You Lose!");
                playerBalance -= betAmount;
            }
            $('#balance').html("You have : $" + playerBalance);
            resetGame();
        } 
    });

    $("#standButton").click(function () {
        while(dealerScore < 17) {
            dealCard(dealerHand, "dealerCard");
            dealerScore = getTotal(dealerHand);
        }
        let result = compare();
        if(result == 1) {
            $('#mesBox').html("You Win!");
            playerBalance += betAmount;
        } else {
            $('#mesBox').html("You Lose!");
            playerBalance -= betAmount;
        }
        $('#balance').html("You have : $" + playerBalance);
        resetGame();
    });
});
