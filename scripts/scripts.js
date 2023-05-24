// Function Cashout
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