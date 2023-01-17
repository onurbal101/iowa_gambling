import CalculationOperation from "../enums/CalculationOperation";
import CalculationField from "../enums/CalculationField";
import CardCategory from "../enums/CardCategory";
import type Card from "./Card";

class Choices {
    private _cards: Card[] = [] as Card[];

    constructor(cards: Card[] = [] as Card[]) {
        this.cards = cards;
    }

    public get cards(): Card[] {
        return this._cards;
    }
    public set cards(cards: Card[]) {
        this._cards = cards;
    }

    public addCard(card: Card) {
        this.cards.push(card);
    }

    private calculate(calculationOperation: CalculationOperation, calculationField: CalculationField | null = null, cardCategory: CardCategory | null = null, start: number = 0, end: number = this.cards.length) {
        let cardsCopy = this.cards.slice(start, end);
        let result: number;

        if (cardCategory !== null) {
            cardsCopy = cardsCopy.filter((card) => card.category === cardCategory);
        }

        if (calculationField !== null) {
            if (calculationField === CalculationField.PNL) {
                cardsCopy = cardsCopy.filter((card) => card.profit !== 0 && card.loss !== 0);
            }
            if (calculationField === CalculationField.PROFIT) {
                cardsCopy = cardsCopy.filter((card) => card.profit !== 0);
            }
            if (calculationField === CalculationField.LOSS) {
                cardsCopy = cardsCopy.filter((card) => card.loss !== 0);
            }
        }

        if (calculationOperation === CalculationOperation.COUNT) {
            result = cardsCopy.length;
        } 
        else if (calculationOperation === CalculationOperation.SUM) {
            if (calculationField !== null) {
                if (calculationField === CalculationField.PNL) {
                    result = cardsCopy.reduce((sum, card) => sum + card.profit - card.loss, 0);
                }
                if (calculationField === CalculationField.PROFIT) {
                    result = cardsCopy.reduce((sum, card) => sum + card.profit, 0);
                }
                if (calculationField === CalculationField.LOSS) {
                    result = cardsCopy.reduce((sum, card) => sum - card.loss, 0);
                }
            }
        }

        return result!;
    }

    public count(cardCategory: CardCategory | null = null, start: number = 0, end: number = this.cards.length) {
        return this.calculate(CalculationOperation.COUNT, null, cardCategory, start, end);
    }

    public countQuantile(quantile: number = 0.2, cardCategory: CardCategory | null = null) {
        const range = quantile * 100;
        const quantiles = {};
        for (let i = 0; i < 1; i += quantile) {
            const start: number = i * 100;
            const end: number = start + range
            quantiles[String(i)] = this.count(cardCategory, start, end);
        }
        
        return quantile;

        }

    public profit(cardCategory: CardCategory | null = null, start: number = 0, end: number = this.cards.length) {
        return this.calculate(CalculationOperation.SUM, CalculationField.PROFIT, cardCategory, start, end);
    }

    public loss(cardCategory: CardCategory | null = null, start: number = 0, end: number = this.cards.length) {
        return this.calculate(CalculationOperation.SUM, CalculationField.LOSS, cardCategory, start, end);
    }

    public pnl(cardCategory: CardCategory | null = null, start: number = 0, end: number = this.cards.length) {
        return this.calculate(CalculationOperation.SUM, CalculationField.PNL, cardCategory, start, end);
    }
}



export default Choices;