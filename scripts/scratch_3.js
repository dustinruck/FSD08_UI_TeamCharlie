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

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    get value() {
        if (['J', 'Q', 'K'].includes(this.rank)) {
            return 10;
        } else if (this.rank === 'A') {
            return [1, 11];
        } else {
            return parseInt(this.rank);
        }
    }
}

class Deck {
    constructor() {
        this.deck = [];

        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (let suit of suits) {
            for (let rank of ranks) {
                this.deck.push(new Card(rank, suit));
            }
        }
    }

    shuffle() {
        let currentIndex = this.deck.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }

        return this;
    }

    deal() {
        return this.deck.pop();
    }
}

function calculateHandValue(hand) {
    let totalValue = 0;
    let aces = 0;

    for (let card of hand) {
        if (card.rank === 'A') {
            aces += 1;
            totalValue += 11;
        } else if (Array.isArray(card.value)) {
            totalValue += card.value[0];
        } else {
            totalValue += card.value;
        }
    }

    while (totalValue > 21 && aces > 0) {
        totalValue -= 10;
        aces -= 1;
    }

    return totalValue;
}

class Player {
    constructor() {
        this.hand = [];
    }

    takeCard(card) {
        this.hand.push(card);
    }

    get handValue() {
        return calculateHandValue(this.hand);
    }
}

class Dealer extends Player {
    constructor() {
        super();
    }

    shouldDrawCard() {
        return this.handValue < 17;
    }
}

class Game {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.player = new Player();
        this.dealer = new Dealer();
    }

    initialDeal() {
        this.player.takeCard(this.deck.deal());
        this.player.takeCard(this.deck.deal());
        this.dealer.takeCard(this.deck.deal());
        this.dealer.takeCard(this.deck.deal());
    }

    playerTurn() {
        while (this.player.handValue < 21) {
            this.player.takeCard(this.deck.deal());
        }
    }

    dealerTurn() {
        while (this.dealer.shouldDrawCard()) {
            this.dealer.takeCard(this.deck.deal());
        }
    }

    play() {
        this.initialDeal();
        this.playerTurn();
        this.dealerTurn();
    }
}

let game = new Game();
game.play();
console.log("Player's hand value: ", game.player.handValue);
console.log("Dealer's hand value: ", game.dealer.handValue);
