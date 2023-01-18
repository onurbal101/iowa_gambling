class Evaluator {
    _name: string | undefined;
    _title: string | undefined;
    _profession: string | undefined;
    _organisation: string | undefined;

    constructor(name?: string, title?: string, profession?: string, organisation?: string) {
        this.name = name;
        this.title = title;
        this.profession = profession;
        this.organisation = organisation;
    }

    public get name(): string | undefined {
        return this._name;
    }
    public set name(name: string | undefined) {
        this._name = name;
    }

    public get title(): string | undefined {
        return this._title;
    }
    public set title(title: string | undefined) {
        this._title = title;
    }

    public get profession(): string | undefined {
        return this._profession;
    }
    public set profession(profession: string | undefined) {
        this._profession = profession;
    }

    public get organisation(): string | undefined {
        return this._organisation;
    }
    public set organisation(organisation: string | undefined) {
        this._organisation = organisation;
    }

}

export default Evaluator;