import type Sex from "../enums/Sex";
import type Education from "../enums/Education";
import Choices from "./Choices";
import Deck from "./Deck";
import Card from "./Card";
import Result from "./Result";

class Player {
    private _name: string | undefined;
    private _birthdate: Date | undefined;
    private _sex: Sex | undefined;
    private _education: Education | undefined;
    private _choices: Choices = new Choices();
    private _balance: number = 2000;
    private _result: Result = new Result(this.choices);

    constructor(name?: string, birthdate?: Date, sex?: Sex, education?: Education, choices: Choices = new Choices(), balance: number = 2000) {
        this.name = name;
        this.birthdate = birthdate;
        this.sex = sex;
        this.education = education;
        this.choices = choices;
        this.balance = balance;
    }

    public get name(): string | undefined {
        return this._name;
    }
    public set name(name: string | undefined) {
        this._name = name;
    }

    public get birthdate(): Date | undefined {
        return this._birthdate;
    }
    public set birthdate(birthdate: Date | undefined) {
        this._birthdate = birthdate;
    }

    public get sex(): Sex | undefined {
        return this._sex;
    }
    public set sex(sex: Sex | undefined) {
        this._sex = sex;
    }

    public get education(): Education | undefined {
        return this._education;
    }
    public set education(education: Education | undefined) {
        this._education = education;
    }

    public get choices(): Choices {
        return this._choices;
    }
    public set choices(choices: Choices) {
        this._choices = choices;
        this._result = new Result(this.choices);
    }

    public get balance(): number {
        return this._balance;
    }
    public set balance(balance: number) {
        this._balance = balance;
    }

    public get result(): Result {
        return this._result;
    }
    public set result(result: Result) {
        this._result = result;
    }

    public choose(deck: Deck) {
        let drawnCard: Card | undefined = deck.draw();

        if (drawnCard !== undefined) {
            this.choices.addCard(drawnCard);
        }
    }
}

export default Player;