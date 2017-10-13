import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { AngularFireAuth } from "angularfire2/auth";
import { PermissionService } from "../permission/permission.service";
import { NavDrawerService } from 'app/nav-drawer.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.css'],
    providers: [NavDrawerService]
})
export class NavDrawerComponent implements OnInit {

    private token: any;

    private signoutResponse: any;

    private userId: string;

    constructor(private router: Router, private cookieService: CookieService, private firebaseAuth: AngularFireAuth, private permissionService: PermissionService, private navDrawerService: NavDrawerService) {
        this.token = this.cookieService.get('token');
    }

    handleLoginState(loggedIn: boolean) {
        console.log('NavDrawerComponent handleLoginState ' + loggedIn);
        if (loggedIn) {
            this.token = this.cookieService.get('token');
        } else {
            this.token = null;
            this.cookieService.removeAll();
        }
    }

    ngOnInit() {
        //use the permission service to get the permission of the user based on the userId
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
