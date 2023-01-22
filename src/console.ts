import * as fs from "fs";
import Game from "./classes/Game";
import Player from "./classes/Player";
import * as rl from "readline-sync";

const game = new Game();

const name = rl.question("What is your name? ");
console.log(`Greetings, ${name}. You have a balance of $2000 and your aim is to increase it as much as possible. The final amount will be transferred to your bank account.`);
while (game.player.choices.cards.length < 100) {
    console.log("");    
    const choice = rl.question("Make a choice: A, B, C, D. ");
    switch(choice.toLowerCase()) {
        case "a":
            console.log(game.player.choose(game.deckA));
            break;
        case "b":
            console.log(game.player.choose(game.deckB));
            break;
        case "c":
            console.log(game.player.choose(game.deckC));
            break;
        case "d":
            console.log(game.player.choose(game.deckD));
            break;
        default:
            console.log("Try again.");
            break;
    }
    console.log(`Your new balance: ${game.player.balance + game.player.choices.pnl()}`);
}

console.log("");
console.log(game.result.counts);
console.log(game.result.scores);
console.log("");