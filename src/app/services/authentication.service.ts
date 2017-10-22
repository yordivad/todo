import {Injectable} from '@angular/core';
import {User} from "../models"
import { Http } from '@angular/http';
import {environment} from "../enviroment"

@Injectable()
export  class AuthenticationService {

    constructor(private http: Http) {

    }


    isAuthenticate(model: User): Promise<User> {
        return new Promise(resolve => {
            this.http.post(environment.apiUrl + "/user/auth", {username: model.user, password: model.password} )
                .subscribe(data=> {
                    var response = data.json();
                    if(response.status === "success"){
                        model.sessionId = response.sessionId;
                    }
                    resolve(model);
                });
        });
    }
}