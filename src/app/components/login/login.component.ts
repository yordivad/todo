
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, ContextService } from "../../services";
import { User } from "../../models";

@Component({
    selector:"login",
    templateUrl: "./login.component.pug",
    styleUrls: [ "./login.component.less"]
})
export class LoginComponent {

    constructor(public auth: AuthenticationService, public router: Router, public context: ContextService  ) {
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
    get user(): string {
        return this._user;
    }

    set user(value: string) {
        this._user = value;
    }

    private _user :string;

    private _password : string;

    login(e: any) {
        this.auth.isAuthenticate(new User(this.user, this.password)).then(result=> {
            if(result.isAuthenticated) {
                this.context.user = result;
                this.router.navigate(["dashboard"])
            }
            else {
                this.router.navigate(["login"])
            }
        });
    }

}

