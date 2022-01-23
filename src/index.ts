let cash = 100;

let cashAmount = document.getElementById("cash")!;
cashAmount.textContent = `$${cash.toString()}`

let firstCard = document.querySelector(".first-card")!;
let secondCard = document.querySelector(".second-card")!;
let nextCard = document.getElementById("next-card")!;
let betAmount: HTMLInputElement = document.querySelector(".bet-amount")!;
let betButton = document.querySelector("button")!;

// based on poker rank values
let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']

function dealInitialCards() {
    // selects an index between 0 - 13, based on cards array length
    let firstRandomIndex = Math.floor(Math.random() * cards.length + 1) - 1

    if (firstRandomIndex >= 11) {
        // we want to get a slice of the cards array if the index selects a 13 or 14, (index 12 or 13)
        // from the beginning of the array up the that index - 1 so it will skip
        let cardSlice = cards.slice(0, firstRandomIndex - 1) // if that first index is 13, then the cardSlice is going to be [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        let secondRandomIndex = Math.floor((Math.random() * cardSlice.length + 1) - 1)
        firstCard.textContent = cards[firstRandomIndex];
        secondCard.textContent = cardSlice[secondRandomIndex]
    } else {
        let cardSlice = cards.slice(firstRandomIndex + 2)
        let secondRandomIndex = Math.floor((Math.random() * cardSlice.length))
        firstCard.textContent = cards[firstRandomIndex];
        secondCard.textContent = cardSlice[secondRandomIndex]
    }

    return [Number(firstCard.textContent), Number(secondCard.textContent)]
}

let initialCards = dealInitialCards()

function dealNextCard() {
    let randIndex = Math.floor(Math.random() * cards.length + 1) - 1
    nextCard.textContent = cards[randIndex]
    return nextCard.textContent
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

    if (Number(nextCard) > initialCards[0] && Number(nextCard) < initialCards[1] ||
        Number(nextCard) < initialCards[0] && Number(nextCard) > initialCards[1]
    ) {
        cash += amount
        cashAmount.textContent = `$${cash.toString()}`
    } else if (Number(nextCard) === initialCards[0] || Number(nextCard) === initialCards[1]) {
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

    // Giving some time after placing to to deal new cards
    setTimeout(() => {
        initialCards = dealInitialCards()
    }, 2000)
}

betButton.addEventListener('click', checkBetResult)

