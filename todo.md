This is a simulation of the Acey Ducey card game. In the game, the dealer (the computer) deals two cards face up. You have an option to bet or not to bet depending on whether or not you feel the next card dealt will have a value between the first two.

Your initial money is set to $100; you may want to alter this value if you want to start with more or less than $100. The game keeps going on until you lose all your money or interrupt the program.

The original program author was Bill Palmby of Prairie View, Illinois.

---

- Computer Deals two random cards (can be 2 random numbers at first)
- User has 100 in cash (optional can be more or less)
- user can bet (any amount?) or not 
  - if next card that computer selects is between the two initial card values user doubles what he bets
  - else if card is the same as any of the two values, user loses double
  - else user loses what he bets
- Game is over if you loose all your money or interrupt the program

---

- [x] Create fn that generates 2 random numbers between 1 and 10
- [x] set initial cash user
- [x] create fn for betting
- [x] create basic ui with html
- [x] Make cards into interfaces in TypeScript
- [x] Find deck of card images
- [x] Add a win situation(e.g. if cash is >= 500)
- [x] Restart or reload after losing all cash
- [x] Check for when the bet amount goes over (or under edge case here) current cash amount
- [x] add second page explaining the rules
- [x] Figure out how to stop the edge case of speed clicking on bet
- [x] Fix bug button disabled bug for when betting without enough funds
- [x] When Game is over, disable buttons as well


