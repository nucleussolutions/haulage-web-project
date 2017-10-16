import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs/Subscription';
import { NavDrawerComponent } from 'app/nav-drawer/nav-drawer.component';
import { IndexComponent } from 'app/index/index.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    private token: string;
    subscription: Subscription;

    private userId: string;

    private apiKey: string;

    @ViewChild(NavDrawerComponent)
    navDrawerComponent : NavDrawerComponent;

    constructor() {
        // this.token = this.cookieService.get('token');
        // this.userId = this.cookieService.get('userId');
        // this.apiKey = this.cookieService.get('apiKey');
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }

    ngAfterViewInit() {
        console.log('AppComponent ngAfterViewInit i dont know what this does');
    }



}
