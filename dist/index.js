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
// *This we can probably get rid of
var cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
function dealInitialCards() {
    // for the suits, we select an index from 0 to 3
    var suitRandomIndex1 = Math.floor(Math.random() * suit.length + 1) - 1;
    var suitRandomIndex2 = Math.floor(Math.random() * suit.length + 1) - 1;
    // selects an index between 0 - 12, based on cards array length
    var firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1;
    // first card setup
    firstCard.textContent = suit[suitRandomIndex1][firstRandomIndex].value;
    firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img;
    /** we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
    from the beginning of the array up the that index - 1 so it will skip.
     In other words, if that first index is the number 13(index 12),
     then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]**/
    if (firstRandomIndex >= 11) {
        var cardSlice_1 = suit[suitRandomIndex1].slice(0, firstRandomIndex - 1);
        var secondRandomIndex_1 = Math.floor((Math.random() * cardSlice_1.length + 1) - 1);
        secondCard.textContent = cardSlice_1[secondRandomIndex_1].value;
        var card = suit[suitRandomIndex2].filter(function (card) { return card.value === cardSlice_1[secondRandomIndex_1].value; });
        secondCard.src = card[0].img;
    }
    else {
        var cardSlice_2 = suit[suitRandomIndex1].slice(firstRandomIndex + 2);
        var secondRandomIndex_2 = Math.floor((Math.random() * cardSlice_2.length + 1) - 1);
        secondCard.textContent = cardSlice_2[secondRandomIndex_2].value;
        var card = suit[suitRandomIndex2].filter(function (card) { return card.value === cardSlice_2[secondRandomIndex_2].value; });
        secondCard.src = card[0].img;
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
    betButton.disabled = true;
    noBetButton.disabled = true;
    var next = dealNextCard();
    var amount = bet();
    // don't let user bet money he doesn't have
    if (amount > cash) {
        alert("".concat(amount, " is more than the current cash you have!"));
        betButton.disabled = false;
        noBetButton.disabled = false;
        nextCard.src = 'cards/back_of_card.png';
        return;
    }
    else if (amount < 0) {
        alert("You can't bet a negative dollars!");
        betButton.disabled = false;
        noBetButton.disabled = false;
        betAmount.value = '0';
        nextCard.src = 'cards/back_of_card.png';
        return;
    }
    if (next > initialCards[0] && next < initialCards[1] ||
        next < initialCards[0] && next > initialCards[1]) {
        cash += amount;
        cashAmount.textContent = "CASH: $".concat(cash.toString());
        if (isWinner()) {
            alert("You won game");
            betButton.disabled = true;
            noBetButton.disabled = true;
            return;
        }
    }
    else if (next === initialCards[0] || next === initialCards[1]) {
        cash -= amount * 2;
        cashAmount.textContent = "CASH: $".concat(cash.toString());
        if (isGameOver()) {
            cashAmount.textContent = "CASH: $".concat(cash.toString(), " You lose!");
            alert("Game Over - Restart Game");
            betButton.disabled = true;
            noBetButton.disabled = true;
            return;
        }
    }
    else {
        cash -= amount;
        cashAmount.textContent = "CASH: $".concat(cash.toString());
        if (isGameOver()) {
            cashAmount.textContent = "CASH: $".concat(cash.toString(), " You lose!");
            alert("Game Over - Restart Game");
            betButton.disabled = true;
            noBetButton.disabled = true;
            return;
        }
    }
    // Giving some time after placing bet to to deal new cards
    setTimeout(function () {
        initialCards = dealInitialCards();
    }, 2000);
    // Give the nextCard the back card image after a few milliseconds
    setTimeout(function () {
        nextCard.src = 'cards/back_of_card.png';
        betButton.disabled = false;
        noBetButton.disabled = false;
    }, 3000);
}
restartButton.addEventListener('click', window.location.reload.bind(window.location));
betButton.addEventListener('click', checkBetResult);
noBetButton.addEventListener('click', function () {
    betAmount.value = '0';
    checkBetResult();
});
//# sourceMappingURL=index.js.map