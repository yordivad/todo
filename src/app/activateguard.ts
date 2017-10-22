import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { ContextService } from './services';


@Injectable()
export class ActivateGuard implements CanActivate {

    constructor(public context: ContextService){
    }

    canActivate() {
        if (typeof (this.context.user) === 'undefined' || !this.context.user.isAuthenticated) {
            return false;
        }
        return true;
    }
}