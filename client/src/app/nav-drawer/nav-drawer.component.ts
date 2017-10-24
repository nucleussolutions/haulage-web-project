import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PermissionService} from "../permission/permission.service";
import {Subscription} from 'rxjs/Subscription';
import {Permission} from "../permission/permission";
import {UserService} from 'app/user.service';


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.css'],
    providers: [UserService]
})
export class NavDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

    ngAfterViewInit(): void {

    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private token: any;

    private signoutResponse: any;

    private userId: string;

    private apiKey: string;

    subscription: Subscription;

    private response: any;

    private permission: Permission;

    constructor(private router: Router, private permissionService: PermissionService, private userService: UserService) {
        this.executeSubscription();
        this.userService.loginState$.subscribe(loggedIn => {
            console.log('NavDrawerComponent loginstate subscribe ' + loggedIn);
            this.executeSubscription();
            if (!loggedIn) {
                this.token = null;
            }
        });
    }

    ngOnInit() {
        //use the permission service to get the permission of the user based on the userId

        this.permissionService.getByUserId(this.userId, this.token, this.apiKey).subscribe(permission => {
            this.permission = permission;
        }, error => {
            console.log('NavDrawerComponent permissionService error ' + error);
        });
    }

    executeSubscription() {
        this.subscription = this.userService.getUser().subscribe(response => {
            this.response = response;
            this.token = this.response.token;
            this.userId = this.response.uid;
            this.apiKey = this.response.apiKey;
            console.log('NavDrawerComponent token ' + this.token);
        }, error => {
            console.log('NavDrawerComponent failed to subscribe to getUser ' + error);
        });
    }

    logout() {
        this.userService.logout();
        this.token = null;
    }
}
