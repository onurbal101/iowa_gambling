import Choices from "./Choices";
import CardCategory from "../enums/CardCategory";

type QuantileCount = {
    "count": number,
    "maxCount": number,
    "quantilePercentage": number,
    "categoryPercentage": number
}

type Quantiles = {
    [key: string]: QuantileCount;
}

type Count = Record<CardCategory | "AB" | "CD", Quantiles>;

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
        const quantiles: Partial<Count> = {};
        for (const category of Object.keys(CardCategory)) {
            const categoryEnum: CardCategory = CardCategory[category as keyof typeof CardCategory];
            const quantileCount = this.choices.countQuantile(0.2, categoryEnum);
            const halfCount = this.choices.countQuantile(0.5, categoryEnum);
            const totalCount = this.choices.countQuantile(1, categoryEnum)["1"];
            const firstHalf = halfCount["0.5"];
            const secondHalf = halfCount["1"];
            const counts = {...quantileCount, "firstHalf": firstHalf, "secondHalf": secondHalf, "total": totalCount};
            quantiles[categoryEnum] = counts;
        }

        for (const categories of [[CardCategory.A, CardCategory.B], [CardCategory.C, CardCategory.D]]) {
            const quantileCount = this.choices.countQuantile(0.2, categories);
            const halfCount = this.choices.countQuantile(0.5, categories);
            const totalCount = this.choices.countQuantile(1, categories)["1"];
            const firstHalf = halfCount["0.5"];
            const secondHalf = halfCount["1"];
            const counts = {...quantileCount, "firstHalf": firstHalf, "secondHalf": secondHalf, "total": totalCount};
            quantiles[String(categories[0]) + String(categories[1]) as keyof Count] = counts;
        }

        return quantiles as Count;
    }

    public get scores() {
        const counts = this.counts;
        const abCombined = counts["AB"];
        const cdCombined = counts["CD"];
        const score: {[key: string]: any} = {};
        for (const key in abCombined) {
            score[key] = {};
            for (const property in abCombined[key]) {
                score[key][property] = cdCombined[key][property as keyof QuantileCount] - abCombined[key][property as keyof QuantileCount];
                if (property === "maxCount") {
                    const range = [-cdCombined[key][property as keyof QuantileCount], cdCombined[key][property as keyof QuantileCount]];;
                    score[key]["range"] = range;
                    delete score[key][property];
                }
            }
            const normalisedCount = ((((score[key]["count"] - score[key]["range"][0]) / (score[key]["range"][1] - score[key]["range"][0])) * 100) - 50) * 2;
            score[key]["normalisedCount"] = normalisedCount;
        }

        return score;
    }
}

export default Result;