
export  class Task {


    constructor (private _title: string = "", private _description: string = "", private _status: string = "", private _author: string = "", private _id:string ="")
    {

    }

    /**
     * get title
     * @returns {string}
     */
    get title(): string {
        return this._title;
    }

    /**
     * set title
     * @param {string} value
     */
    set title(value: string) {
        this._title = value;
    }

    /**
     * get description
     * @returns {string}
     */
    get description(): string {
        return this._description;
    }

    /**
     * set description
     * @param value
     */
    set description(value: string) {
        this._description = value;
    }

    /**
     * get status
     * @returns {string}
     */
    get status(): string {
        return this._status;
    }

    /**
     * set status
     * @param value
     */
    set status(value: string) {
        this._status = value;
    }

    /**
     * get author
     * @returns {string}
     */
    get author(): string {
        return this._author;
    }

    /**
     * set author
     * @param value
     */
    set author(value: string) {
        this._author = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

}