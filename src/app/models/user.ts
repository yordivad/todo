
export class User {

   constructor(private _user: string = "", private _password: string = "") {

   }

    get sessionId(): string {
        return this._sessionId;
    }

    set sessionId(value: string) {
        this._sessionId = value;
    }

    private _sessionId: string = "";

    get isAuthenticated(): boolean {
        return this._sessionId !== "";
    }

    get user(): string {
        return this._user;
    }

    set user(value: string) {
        this._user = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}