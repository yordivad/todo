import {Injectable} from '@angular/core';
import {User} from "../models"

@Injectable()
export  class ContextService {

    private _user: User;

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

}