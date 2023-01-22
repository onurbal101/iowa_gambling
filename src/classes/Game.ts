import CardCategory from "../enums/CardCategory";
import Deck from "./Deck";
import Player from "./Player";
import Result from "./Result";

class Game {
    private _player: Player = new Player();
    private _deckA: Deck = Deck.readCsv("../decks/deck_a.csv", CardCategory.A);
    private _deckB: Deck = Deck.readCsv("../decks/deck_b.csv", CardCategory.B);
    private _deckC: Deck = Deck.readCsv("../decks/deck_c.csv", CardCategory.C);
    private _deckD: Deck = Deck.readCsv("../decks/deck_d.csv", CardCategory.D);

    // constructor(player?: Player, deckA?: Deck, deckB?: Deck, deckC?: Deck, deckD?: Deck) {
    //     this.player = player;
    // }

    public get player(): Player {
        return this._player;
    }
    public set player(player: Player) {
        this._player = player;
    }

    public get result(): Result {
        return this.player.result;
    }

    public get deckA(): Deck {
        return this._deckA;
    }
    public set deckA(deck: Deck){
        this._deckA = deck
    }

    public get deckB(): Deck {
        return this._deckB;
    }
    public set deckB(deck: Deck){
        this._deckB = deck
    }

    public get deckC(): Deck {
        return this._deckC;
    }
    public set deckC(deck: Deck){
        this._deckC = deck
    }

    public get deckD(): Deck {
        return this._deckD;
    }
    public set deckD(deck: Deck){
        this._deckD = deck
    }
     
}

export default Game;