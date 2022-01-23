var cash = 100;
var cashAmount = document.getElementById("cash");
cashAmount.textContent = "$".concat(cash.toString());
var firstCard = document.querySelector(".first-card");
var secondCard = document.querySelector(".second-card");
var nextCard = document.getElementById("next-card");
var betAmount = document.querySelector(".bet-amount");
var betButton = document.querySelector("button");
// based on poker rank values
var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
function dealInitialCards() {
    // selects an index between 0 - 13, based on cards array length
    var firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    if (firstRandomIndex >= 11) {
        // we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
        // from the beginning of the array up the that index - 1 so it will skip
        var cardSlice = cards.slice(0, firstRandomIndex - 1); // if that first index is 13, then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        var secondRandomIndex = Math.floor((Math.random() * cardSlice.length + 1) - 1);
        firstCard.textContent = cards[firstRandomIndex];
        secondCard.textContent = cardSlice[secondRandomIndex];
    }
    else {
        var cardSlice = cards.slice(firstRandomIndex + 2);
        var secondRandomIndex = Math.floor((Math.random() * cardSlice.length));
        firstCard.textContent = cards[firstRandomIndex];
        secondCard.textContent = cardSlice[secondRandomIndex];
    }
    return [Number(firstCard.textContent), Number(secondCard.textContent)];
}
var initialCards = dealInitialCards();
function dealNextCard() {
    var randIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    nextCard.textContent = cards[randIndex];
    return nextCard.textContent;
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
    if (Number(nextCard) > initialCards[0] && Number(nextCard) < initialCards[1] ||
        Number(nextCard) < initialCards[0] && Number(nextCard) > initialCards[1]) {
        cash += amount;
        cashAmount.textContent = "$".concat(cash.toString());
    }
    else if (Number(nextCard) === initialCards[0] || Number(nextCard) === initialCards[1]) {
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
    // Giving some time after placing to to deal new cards
    setTimeout(function () {
        initialCards = dealInitialCards();
    }, 2000);
}
betButton.addEventListener('click', checkBetResult);
