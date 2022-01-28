import {clubs, diamonds, hearts, spades} from "./cards.js";
let cash = 100;

let cashAmount = document.getElementById("cash")!;
cashAmount.textContent = `CASH: $${cash.toString()}`

let firstCard:HTMLImageElement = document.querySelector(".first-card")!;
let secondCard:HTMLImageElement = document.querySelector(".second-card")!;
let nextCard:HTMLImageElement = document.querySelector("#next-card")!;
let betAmount: HTMLInputElement = document.querySelector(".bet-amount")!;
let betButton = document.querySelector(".bet-button")!;
let noBetButton = document.querySelector(".no-bet-button")!;
let restartButton = document.querySelector(".restart")!;

// based on poker rank values
let suit = [clubs, diamonds, hearts, spades]
let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

function dealInitialCards() {
    // for the suits, we select an index from 0 to 3
    let suitRandomIndex1 = Math.floor(Math.random() * suit.length + 1) - 1
    let suitRandomIndex2 = Math.floor(Math.random() * suit.length + 1) - 1

    // selects an index between 0 - 12, based on cards array length
    let firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1

    if (firstRandomIndex >= 11) {
        // we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
        // from the beginning of the array up the that index - 1 so it will skip
        let cardSlice = suit[suitRandomIndex1].slice(0, firstRandomIndex - 1) // if that first index is the number 13(index 11), then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        let secondRandomIndex = Math.floor((Math.random() * cardSlice.length + 1) - 1)

        firstCard.textContent = suit[suitRandomIndex1][firstRandomIndex].value;
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img

        secondCard.textContent = cardSlice[secondRandomIndex].value
        let img2 = suit[suitRandomIndex2].filter(card => card.value === cardSlice[secondRandomIndex].value)
        secondCard.src = img2[0].img
    } else {
        let cardSlice = suit[suitRandomIndex1].slice(firstRandomIndex + 2)
        let secondRandomIndex = Math.floor((Math.random() * cardSlice.length + 1) - 1)

        firstCard.textContent = cards[firstRandomIndex];
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img

        secondCard.textContent = cardSlice[secondRandomIndex].value
        let img2 = suit[suitRandomIndex2].filter(card => card.value === cardSlice[secondRandomIndex].value)
        secondCard.src = img2[0].img
    }

    return [Number(firstCard.textContent), Number(secondCard.textContent)]
}

let initialCards = dealInitialCards()

function dealNextCard() {
    let randIndex = Math.floor(Math.random() * cards.length + 1) - 1
    nextCard.textContent = cards[randIndex]
    nextCard.src = suit[Math.floor(Math.random() * suit.length + 1) - 1][randIndex].img
    return Number(nextCard.textContent)
}

function bet() {
    return Number(betAmount.value)
}

function isGameOver(): boolean {
  return cash <= 0
}

function isWinner(): boolean {
    return cash >= 500
}

function checkBetResult() {
    let next = dealNextCard()
    let amount = bet()

    if (amount < 0 || amount > cash) {
        alert("You don't have enough cash!")
        return
    }

    if (next > initialCards[0] && next < initialCards[1] ||
        next < initialCards[0] && next > initialCards[1]
    ) {
        cash += amount
        cashAmount.textContent = `CASH: $${cash.toString()}`

        if(isWinner()) {
            alert("You won game")
        }

    } else if (next === initialCards[0] || next === initialCards[1]) {
        cash -= amount * 2
        cashAmount.textContent = `CASH: $${cash.toString()}`
        if (isGameOver()) {
            cashAmount.textContent = `CASH: $${cash.toString()} You lose!`
            alert("Game Over - Restart Game")
        }

    } else {
        cash -= amount
        cashAmount.textContent = `CASH: $${cash.toString()}`
        if (isGameOver()) {
            cashAmount.textContent = `CASH: $${cash.toString()} You lose!`
            alert("Game Over - Restart Game")
        }
    }

    // Giving some time after placing bet to to deal new cards
    setTimeout(() => {
        initialCards = dealInitialCards()
    }, 2000)

    // Give the nextCard the back card image after a few milliseconds
    setTimeout(() => {
        nextCard.src = 'cards/back_of_card.png'
    }, 3000)
}

betButton.addEventListener('click', checkBetResult)
noBetButton.addEventListener('click', () => {
    betAmount.value = '0'
    checkBetResult()
})
restartButton.addEventListener('click', location.reload)
