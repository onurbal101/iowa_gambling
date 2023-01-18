import CalculationOperation from "../enums/CalculationOperation";
import CalculationField from "../enums/CalculationField";
import CardCategory from "../enums/CardCategory";
import Card from "./Card";
import Result from "./Result";

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

    private calculate(calculationOperation: CalculationOperation, calculationField: CalculationField | null = null, cardCategory: CardCategory | CardCategory[] | null = null, start: number = 0, end: number = this.cards.length) {
        let cardsCopy = this.cards.slice(start, end);
        let result: number;

        if (cardCategory !== null) {
            if (!Array.isArray(cardCategory)) {
                cardsCopy = cardsCopy.filter((card) => card.category === cardCategory);
            } else {
                cardsCopy = cardsCopy.filter((card) => cardCategory!.includes(card.category));
            }
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

    public count(cardCategory: CardCategory | CardCategory[] | null = null, start: number = 0, end: number = this.cards.length) {
        return this.calculate(CalculationOperation.COUNT, null, cardCategory, start, end);
    }

    public countQuantile(quantile: number = 0.2, cardCategory: CardCategory | CardCategory[]) {
        const max: number = this.cards.length;
        const step = quantile * max;
        const quantiles: {[key: string]: {"count": number, "maxCount": number, "quantilePercentage": number, "categoryPercentage": number}} = {};
        for (let start = 0; start < max; start += step) {
            const end: number = start + step;
            const count: number = this.count(cardCategory, start, end)
            const categoryTotal: number = this.count(cardCategory);
            const quantileTotal: number = this.count(null, start, end);
            const categoryPercentage: number = count / categoryTotal;
            const quantilePercentage: number = count / quantileTotal;
            quantiles[String(end / this.cards.length)] = {count, "maxCount": quantileTotal, quantilePercentage, categoryPercentage};
        }
        
        return quantiles;

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

const a = new Choices();
for (let i = 0; i < 5; i++) {
    a.addCard(new Card(CardCategory.A, 100, 25))
}
for (let i = 0; i < 5; i++) {
    a.addCard(new Card(CardCategory.B, 100, 25))
}
for (let i = 0; i < 5; i++) {
    a.addCard(new Card(CardCategory.C, 100, 25))
}
for (let i = 0; i < 5; i++) {
    a.addCard(new Card(CardCategory.D, 100, 25))
}

const b = new Result(a);
console.log(b.scores);

export default Choices;