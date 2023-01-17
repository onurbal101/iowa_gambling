import Choices from "./Choices";
import CardCategory from "../enums/CardCategory";

type QuantileCount = {
    "count": number,
    "quantilePercentage": number,
    "categoryPercentage": number
}

type Quantiles = {
    [key: string]: QuantileCount;
}

type Count = Record<CardCategory | "AB" | "CD", string>;

class Result {
    private _choices!: Choices;

    constructor(choices: Choices) {
        this.choices = choices;
    }

    public get choices(): Choices {
        return this._choices;
    }
    public set choices(choices: Choices) {
        this._choices = choices;
    }

    public get counts() {
        const quantiles: Partial<{[key in CardCategory]: Quantiles}> = {};
        for (const category of [...Object.keys(CardCategory), "AB", "CD"]) {
            const categoryEnum: CardCategory = CardCategory[category as keyof typeof CardCategory];
            const quantileCount = this.choices.countQuantile(0.2, categoryEnum);
            const halfCount = this.choices.countQuantile(0.5, categoryEnum);
            const totalCount = this.choices.countQuantile(1, categoryEnum)["1"];
            const firstHalf = halfCount["0.5"];
            const secondHalf = halfCount["1"];
            const counts = {...quantileCount, "first half": firstHalf, "second half": secondHalf, "total": totalCount};
            quantiles[categoryEnum] = counts;
        }

        return quantiles;
    }

    public get scores() {
        const counts = this.counts;
        const abCombined = this.choices.countQuantile(0.2, [CardCategory.A, CardCategory.B]);
        const cdCombined = this.choices.countQuantile(0.2, [CardCategory.C, CardCategory.D]);
        const quantiles: Partial<{[key in CardCategory]: {[key: string]: {"count": number, "quantilePercentage": number, "categoryPercentage": number}}}> = {};
        for (const category of Object.keys(CardCategory)) {
            const categoryEnum: CardCategory = CardCategory[category as keyof typeof CardCategory];
            quantiles[categoryEnum] = this.choices.countQuantile(0.2, categoryEnum);
        }

        return abCombined;
    }
}

export default Result;