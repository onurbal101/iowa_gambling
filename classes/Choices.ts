import CalculationOperation from "../enums/CalculationOperation";
import CalculationField from "../enums/CalculationField";
import CardCategory from "../enums/CardCategory";
import type Card from "./Card";

class Choices {
    private _cards: Card[];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    public get cards(): Card[] {
        return this._cards;
    }
    public set cards(cards: Card[]) {
        this._cards = cards;
    }

    private calculate(operation: CalculationOperation, field: CalculationField | null = null, cardCategory: CardCategory | null = null, start: number = 0, end: number = this.cards.length) {
        let cardsCopy = this.cards.slice(start, end);

        if (cardCategory !== null) {
            cardsCopy = cardsCopy.filter((card) => card.category === cardCategory)
        }

        if (operation === CalculationOperation.COUNT) {
            return cardsCopy.length;
        }

        if (operation === CalculationOperation.SUM) {

        }
    }

    public count(start: number = 0, end: number = this.cards.length) {

    }

    public profit(start: number = 0, end: number = this.cards.length) {
        let cardsCopy = this.cards.slice(start, end);
    }
}

export default Choices;