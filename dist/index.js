import { clubs, diamonds, hearts, spades } from "./cards.js";
var cash = 100;
console.log(clubs[0].name);
var cashAmount = document.getElementById("cash");
cashAmount.textContent = "$".concat(cash.toString());
var firstCard = document.querySelector(".first-card");
var secondCard = document.querySelector(".second-card");
var nextCard = document.getElementById("next-card");
var betAmount = document.querySelector(".bet-amount");
var betButton = document.querySelector("button");
// based on poker rank values
var suit = [clubs, diamonds, hearts, spades];
var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
function dealInitialCards() {
    // selects an index between 0 - 13, based on cards array length
    var suitRandomIndex1 = Math.floor(Math.random() * suit.length + 1) - 1;
    var suitRandomIndex2 = Math.floor(Math.random() * suit.length + 1) - 1;
    var firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    if (firstRandomIndex >= 11) {
        // we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
        // from the beginning of the array up the that index - 1 so it will skip
        var cardSlice = cards.slice(0, firstRandomIndex - 1); // if that first index is the number 13(index 11), then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        var secondRandomIndex = Math.floor((Math.random() * cardSlice.length + 1) - 1);
        firstCard.textContent = suit[suitRandomIndex1][firstRandomIndex].value;
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img;
        secondCard.textContent = cardSlice[secondRandomIndex];
        secondCard.src = suit[suitRandomIndex2][secondRandomIndex].img;
    }
    else {
        var cardSlice = cards.slice(firstRandomIndex + 2);
        var secondRandomIndex = Math.floor((Math.random() * cardSlice.length));
        firstCard.textContent = cards[firstRandomIndex];
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img;
        secondCard.textContent = cardSlice[secondRandomIndex];
        secondCard.src = suit[suitRandomIndex2][secondRandomIndex].img;
    }
    return [Number(firstCard.textContent), Number(secondCard.textContent)];
}
var initialCards = dealInitialCards();
function dealNextCard() {
    var randIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    nextCard.textContent = cards[randIndex];
    return Number(nextCard.textContent);
}
function bet() {
    return Number(betAmount.value);
}
function isGameOver() {
    return cash <= 0;
}
function checkBetResult() {
    var nextCard = dealNextCard();
    var amount = bet();
    if (nextCard > initialCards[0] && nextCard < initialCards[1] ||
        nextCard < initialCards[0] && nextCard > initialCards[1]) {
        cash += amount;
        cashAmount.textContent = "$".concat(cash.toString());
    }
    else if (nextCard === initialCards[0] || nextCard === initialCards[1]) {
        cash -= amount * 2;
        cashAmount.textContent = "$".concat(cash.toString());
        if (isGameOver()) {
            alert("Game Over");
        }
    }
    else {
        cash -= amount;
        cashAmount.textContent = "$".concat(cash.toString());
        if (isGameOver()) {
            alert("Game Over");
        }
    }
    // Giving some time after placing bet to to deal new cards
    setTimeout(function () {
        initialCards = dealInitialCards();
    }, 2000);
}
betButton.addEventListener('click', checkBetResult);
//# sourceMappingURL=index.js.map