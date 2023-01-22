import CardCategory from "../enums/CardCategory";
import Card from "./Card";
import * as fs from "fs";
import * as path from "path";

class Deck {
    private _name!: string;
    private _cards!: Card[];

    constructor(name: string, cards: Card[]) {
        this.name = name;
        this.cards = cards;
    }

    public get name(): string {
        return this._name;
    }
    public set name(name: string) {
        this._name = name;
    }

    public get cards(): Card[] {
        return this._cards;
    }
    public set cards(cards: Card[]) {
        this._cards = cards;
    }

    public get isEmpty(): boolean {
        return this.cards.length === 0;
    }

    public draw(): Card | undefined {
        return this.cards.shift();
    }

    public static readCsv(filePath: string, cardCategory: CardCategory): Deck {
        const absolutePath = path.resolve(__dirname, filePath);
        const data = fs.readFileSync(absolutePath, {encoding: "utf8", flag: "r"});
        const cards: Card[] = [];
        for (const line of data.split("\n").slice(1)) {
            const [profit, loss] = line.split(",");
            const card = new Card(cardCategory, parseInt(profit), parseInt(loss));
            cards.push(card);
        }
        return new Deck(cardCategory, cards);
    }
}

export default Deck;