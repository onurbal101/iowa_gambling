import type CardCategory from "../enums/CardCategory";

class Card {
    private _category!: CardCategory;
    private _profit!: number;
    private _loss!: number;

    constructor(category: CardCategory, profit: number, loss: number) {
        this.category = category;
        this.profit = profit;
        this.loss = loss;
    }

    public get category(): CardCategory {
        return this._category;
    }
    public set category(category: CardCategory) {
        this._category = category;
    }

    public get profit(): number {
        return this._profit;
    }
    public set profit(profit: number) {
        if (profit < 0) {
            throw new Error("Profit cannot be less than 0.")
        };

        this._profit = profit;
    }

    public get loss(): number {
        return this._loss;
    }
    public set loss(loss: number) {
        if (loss < 0) {
            throw new Error("Loss cannot be less than 0.")
        };
        this._loss = loss;
    }
}

export default Card;