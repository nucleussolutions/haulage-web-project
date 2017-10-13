import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Subscription } from 'rxjs/Subscription';
import { NavDrawerService } from 'app/nav-drawer.service';
import { NavDrawerComponent } from 'app/nav-drawer/nav-drawer.component';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [NavDrawerService]
})
export class AppComponent implements OnInit, OnDestroy {

    private token: string;
    private userRole: string;

    subscription: Subscription;

    @ViewChild(NavDrawerComponent)
    navDrawerComponent: NavDrawerComponent;

    constructor(private cookieService: CookieService, private navDrawerService: NavDrawerService) {
        this.subscription = this.navDrawerService.getLoginState().subscribe(loggedIn => {
            console.log('AppComponent loginState ' + loggedIn);
            this.navDrawerComponent.handleLoginState(loggedIn);
        }, error => {
            console.log('AppComponent loginState error ' + error);
        });
    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        this.token = this.cookieService.get('token');
        this.userRole = this.cookieService.get('userRole');
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
