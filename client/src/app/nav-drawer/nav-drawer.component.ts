import {Component, OnInit, OnDestroy, Input, AfterViewInit} from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { AngularFireAuth } from "angularfire2/auth";
import { PermissionService } from "../permission/permission.service";
import { NavDrawerService } from 'app/nav-drawer.service';
import { Subscription } from 'rxjs/Subscription';
import {Permission} from "../permission/permission";


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.css'],
    providers: [NavDrawerService]
})
export class NavDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

    ngAfterViewInit(): void {
        // throw new Error('Method not implemented.');
        console.log('NavDrawerComponent ngAfterViewInit');

        this.subscription = this.navDrawerService.appToNavDrawerLoginState$.subscribe(loggedIn => {
            console.log('NavDrawerComponent login state '+loggedIn);
            if (loggedIn) {
                this.token = this.cookieService.get('token');
                console.log('token '+this.token);
            } else {
                this.token = null;
                console.log('token '+this.token);
                this.cookieService.removeAll();
            }
        }, error => {
            console.log('failed to fetch login state '+error);
        });

        console.log('subscription '+this.subscription);
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private token: any;

    private signoutResponse: any;

    private userId: string;

    private apiKey: string;

    subscription: Subscription;

    constructor(private router: Router, private cookieService: CookieService, private firebaseAuth: AngularFireAuth, private permissionService: PermissionService, private navDrawerService: NavDrawerService) {
        this.token = this.cookieService.get('token');
        this.userId = this.cookieService.get('userId');
        this.apiKey = this.cookieService.get('apiKey');

    }

    ngOnInit() {
        //use the permission service to get the permission of the user based on the userId

        // this.permissionService.getByUserId(this.userId, this.token, this.apiKey).subscribe(permission => Permission, error => {
        //     console.log('NavDrawerComponent permissionService error '+error);
        // });


    }

    logout() {

        this.firebaseAuth.auth.signOut().then(response => {
            this.signoutResponse = response;
        }, error => {
            console.log(error);
        });

        //clear cookies from the cookieservice
        this.cookieService.removeAll();
        this.token = null;
    }
}
