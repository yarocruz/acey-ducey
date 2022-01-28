import { clubs, diamonds, hearts, spades } from "./cards.js";
var cash = 100;
var cashAmount = document.getElementById("cash");
cashAmount.textContent = "CASH: $".concat(cash.toString());
var firstCard = document.querySelector(".first-card");
var secondCard = document.querySelector(".second-card");
var nextCard = document.querySelector("#next-card");
var betAmount = document.querySelector(".bet-amount");
var betButton = document.querySelector(".bet-button");
var noBetButton = document.querySelector(".no-bet-button");
var restartButton = document.querySelector(".restart");
// based on poker rank values
var suit = [clubs, diamonds, hearts, spades];
var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
function dealInitialCards() {
    // for the suits, we select an index from 0 to 3
    var suitRandomIndex1 = Math.floor(Math.random() * suit.length + 1) - 1;
    var suitRandomIndex2 = Math.floor(Math.random() * suit.length + 1) - 1;
    // selects an index between 0 - 12, based on cards array length
    var firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    if (firstRandomIndex >= 11) {
        // we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
        // from the beginning of the array up the that index - 1 so it will skip
        var cardSlice_1 = suit[suitRandomIndex1].slice(0, firstRandomIndex - 1); // if that first index is the number 13(index 11), then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        var secondRandomIndex_1 = Math.floor((Math.random() * cardSlice_1.length + 1) - 1);
        firstCard.textContent = suit[suitRandomIndex1][firstRandomIndex].value;
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img;
        secondCard.textContent = cardSlice_1[secondRandomIndex_1].value;
        var img2 = suit[suitRandomIndex2].filter(function (card) { return card.value === cardSlice_1[secondRandomIndex_1].value; });
        secondCard.src = img2[0].img;
    }
    else {
        var cardSlice_2 = suit[suitRandomIndex1].slice(firstRandomIndex + 2);
        var secondRandomIndex_2 = Math.floor((Math.random() * cardSlice_2.length + 1) - 1);
        firstCard.textContent = cards[firstRandomIndex];
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img;
        secondCard.textContent = cardSlice_2[secondRandomIndex_2].value;
        var img2 = suit[suitRandomIndex2].filter(function (card) { return card.value === cardSlice_2[secondRandomIndex_2].value; });
        secondCard.src = img2[0].img;
    }
    return [Number(firstCard.textContent), Number(secondCard.textContent)];
}
var initialCards = dealInitialCards();
function dealNextCard() {
    var randIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    nextCard.textContent = cards[randIndex];
    nextCard.src = suit[Math.floor(Math.random() * suit.length + 1) - 1][randIndex].img;
    return Number(nextCard.textContent);
}
function bet() {
    return Number(betAmount.value);
}
function isGameOver() {
    return cash <= 0;
}
function isWinner() {
    return cash >= 500;
}
function checkBetResult() {
    var next = dealNextCard();
    var amount = bet();
    if (amount < 0 || amount > cash) {
        alert("You don't have enough cash!");
        return;
    }
    if (next > initialCards[0] && next < initialCards[1] ||
        next < initialCards[0] && next > initialCards[1]) {
        cash += amount;
        cashAmount.textContent = "CASH: $".concat(cash.toString());
        if (isWinner()) {
            alert("You won game");
        }
    }
    else if (next === initialCards[0] || next === initialCards[1]) {
        cash -= amount * 2;
        cashAmount.textContent = "CASH: $".concat(cash.toString());
        if (isGameOver()) {
            cashAmount.textContent = "CASH: $".concat(cash.toString(), " You lose!");
            alert("Game Over - Restart Game");
        }
    }
    else {
        cash -= amount;
        cashAmount.textContent = "CASH: $".concat(cash.toString());
        if (isGameOver()) {
            cashAmount.textContent = "CASH: $".concat(cash.toString(), " You lose!");
            alert("Game Over - Restart Game");
        }
    }
    // Giving some time after placing bet to to deal new cards
    setTimeout(function () {
        initialCards = dealInitialCards();
    }, 2000);
    // Give the nextCard the back card image after a few milliseconds
    setTimeout(function () {
        nextCard.src = 'cards/back_of_card.png';
    }, 3000);
}
betButton.addEventListener('click', checkBetResult);
noBetButton.addEventListener('click', function () {
    betAmount.value = '0';
    checkBetResult();
});
restartButton.addEventListener('click', location.reload);
//# sourceMappingURL=index.js.map