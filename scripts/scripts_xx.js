let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerBalance = 100;
let betAmount = 0;

function createDeck() {
    let cardNums = ["A", "K", "Q", "J", "10", "9", "8", "7",
        "6", "5", "4", "3", "2"];
    let suits = ["♥︎", "♦︎", "♠︎", "♣︎"];
    for (let i = 0; i < cardNums.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let card = {
                cardNum: cardNums[i],
                suit: suits[j]
            };
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

function dealCard(hand) {
    createDeck();
    shuffleDeck();
    let card = deck.pop();
    hand.push(card);
    return card;
}

$(document).ready(function () {

    // click rules button to display and hide the rules
    let rulesText = document.getElementById('rulesText');
    document.getElementById('showRulesButton').addEventListener('click', function () {
        if (rulesText.style.display === 'block') {
            rulesText.style.display = 'none';
        } else {
            rulesText.style.display = 'block';
        }
    });

    $('#newGameButton').click(function () {
        $('#newGameButton').prop('disabled', true);
        $('#hitButton').prop('disabled', false);
        $('#standButton').prop('disabled', false);
        $('#cashOutButton').prop('disabled', false);
        // display the first 2 cards
        $('#dealerCard').append(dealCard(dealerHand).cardNum + " " + dealCard(playerHand).suit);
        $('#dealerCard').append(dealCard(dealerHand).cardNum + " " + dealCard(playerHand).suit);

        $('#playerCard').append(dealCard(playerHand).cardNum + " " + dealCard(playerHand).suit);
        $('#playerCard').append(dealCard(playerHand).cardNum + " " + dealCard(playerHand).suit);





    });




});