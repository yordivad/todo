import { Routes, RouterModule } from "@angular/router";
import {LoginComponent, DashboardComponent} from "./components";

import { ActivateGuard } from "./activateguard";



const routes: Routes = [
    {path: "", redirectTo:"login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "dashboard", component: DashboardComponent, canActivate:[ActivateGuard]},
    {path: '**', redirectTo: 'login'}
];

export const appRoutingProviders : any[] = [];

export const routing = RouterModule.forRoot(routes,  {useHash: true});