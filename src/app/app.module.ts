import 'hammerjs';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule, FormsModule }   from "@angular/forms";
import {AppComponent } from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoginComponent, DashboardComponent, TaskComponent} from "./components";
import {routing, appRoutingProviders } from "./app.routes";
import {ActivateGuard} from "./activateguard";
import {AuthenticationService, ContextService, TaskService} from './services';
import {MaterialModule} from './material';
import {HttpModule } from '@angular/http';
import {DragDirective} from './directive/drag.directive';
import {DropDirective} from './directive/drop.directive';
import {EditorModule} from 'primeng/primeng'


@NgModule( {
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        HttpModule ,
        EditorModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        TaskComponent,
        DropDirective,
        DragDirective
    ],
    bootstrap: [ AppComponent ],
    providers: [
        appRoutingProviders,
        AuthenticationService,
        ContextService,
        TaskService,
        ActivateGuard
    ]
})
export  class AppModule {

}
