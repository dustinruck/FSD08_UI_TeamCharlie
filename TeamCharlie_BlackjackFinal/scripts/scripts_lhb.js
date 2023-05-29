

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
document.getElementById("cashOutButton").addEventListener("click", cashOut);


// Function hit-lhb
function hit() {
    standButton.disabled = true;
    hitButton.disabled = true;
    dealCard(playerHand);  
    var playerTotal = getTotal(playerHand); 
    if (playerTotal > 21)
        endGame(false, "YOU WENT OVER 21!");
    else if (playerHand.length == 5) 
        endGame(true, "You took 5 cards without going over 21.");
    else if (playerTotal == 21)
        dealersTurnAndEndGame();
    // else {
    //     message.innerHTML = "You have " + playerTotal + ". Hit or Stand?";
    //     hitButton.disabled = false;
    //     standButton.disabled = false;
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
function endGame(win, why) {
    if (win)
        money += bet;
    else
        money -= bet;
    message.innerHTML = (win ? "Congratulations! You win.  " : "Sorry! You lose.  ") + why + 
          (money > 0 ? "<br>Click New Game to play again." : "<br>Looks like you've run out of money!");
    standButton.disabled = true;
    hitButton.disabled = true;
    newGameButton.disabled = true;
    gameInProgress = false;
    if (dealerCards[2].faceDown) {
      dealerCards[2].cardContainer.style.display = "none";
      dealerCards[2].setFaceUp();
      new Effect.SlideDown(dealerCards[2].cardContainer, { duration: 0.5, queue: "end" });
    }
    new Effect.Fade(moneyDisplay, {
       duration: 0.5,
       queue: "end",
       afterFinish: function() {
           moneyDisplay.innerHTML = "$" + money;
           new Effect.Appear(moneyDisplay, {
              duration: 0.5,
              queue: "end",
              afterFinish: function() {
                  if (money <= 0) {
                       betInput.value = "BUSTED";
                       new Effect.Shake(moneyDisplay);
                  }
                  else {
                      if (bet > money)
                         betInput.value = money;
                      standButton.disabled = true;
                      hitButton.disabled = true;
                      newGameButton.disabled = false;
                      betInput.disabled = false;
                  }
              }
           });
       }
    });
}
