import {clubs, diamonds, hearts, spades} from "./cards.js";
let cash = 100;

console.log(clubs[0].name)

let cashAmount = document.getElementById("cash")!;
cashAmount.textContent = `$${cash.toString()}`

let firstCard:HTMLImageElement = document.querySelector(".first-card")!;
let secondCard:HTMLImageElement = document.querySelector(".second-card")!;
let nextCard = document.getElementById("next-card")!;
let betAmount: HTMLInputElement = document.querySelector(".bet-amount")!;
let betButton = document.querySelector("button")!;

// based on poker rank values
let suit = [clubs, diamonds, hearts, spades]
let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

function dealInitialCards() {
    // selects an index between 0 - 13, based on cards array length
    let suitRandomIndex1 = Math.floor(Math.random() * suit.length + 1) - 1
    let suitRandomIndex2 = Math.floor(Math.random() * suit.length + 1) - 1


    let firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1

    if (firstRandomIndex >= 11) {
        // we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
        // from the beginning of the array up the that index - 1 so it will skip
        let cardSlice = cards.slice(0, firstRandomIndex - 1) // if that first index is the number 13(index 11), then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        let secondRandomIndex = Math.floor((Math.random() * cardSlice.length + 1) - 1)

        firstCard.textContent = suit[suitRandomIndex1][firstRandomIndex].value;
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img

        secondCard.textContent = cardSlice[secondRandomIndex]
        secondCard.src = suit[suitRandomIndex2][secondRandomIndex].img
    } else {
        let cardSlice = cards.slice(firstRandomIndex + 2)
        let secondRandomIndex = Math.floor((Math.random() * cardSlice.length))

        firstCard.textContent = cards[firstRandomIndex];
        firstCard.src = suit[suitRandomIndex1][firstRandomIndex].img

        secondCard.textContent = cardSlice[secondRandomIndex]
        secondCard.src = suit[suitRandomIndex2][secondRandomIndex].img
    }

    return [Number(firstCard.textContent), Number(secondCard.textContent)]
}

let initialCards = dealInitialCards()

function dealNextCard() {
    let randIndex = Math.floor(Math.random() * cards.length + 1) - 1
    nextCard.textContent = cards[randIndex]
    return Number(nextCard.textContent)
}

function bet() {
    return Number(betAmount.value)
}

function isGameOver(): boolean {
  return cash <= 0
}

function checkBetResult() {
    let nextCard = dealNextCard()
    let amount = bet()

    if (nextCard > initialCards[0] && nextCard < initialCards[1] ||
        nextCard < initialCards[0] && nextCard > initialCards[1]
    ) {
        cash += amount
        cashAmount.textContent = `$${cash.toString()}`
    } else if (nextCard === initialCards[0] || nextCard === initialCards[1]) {
        cash -= amount * 2
        cashAmount.textContent = `$${cash.toString()}`
        if (isGameOver()) {
            alert("Game Over")
        }
    } else {
        cash -= amount
        cashAmount.textContent = `$${cash.toString()}`
        if (isGameOver()) {
            alert("Game Over")
        }
    }

    // Giving some time after placing bet to to deal new cards
    setTimeout(() => {
        initialCards = dealInitialCards()
    }, 2000)
}

betButton.addEventListener('click', checkBetResult)

