import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {LoginService} from "../login.service";
import {AngularFireAuth} from "angularfire2/auth";
import {PermissionService} from "../permission/permission.service";


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.css'],
    providers: [LoginService]
})
export class NavDrawerComponent implements OnInit {

    private token: any;

    private signoutResponse : any;

    private userId : string;

    constructor(private router: Router, private cookieService: CookieService, private firebaseAuth: AngularFireAuth, private permissionService : PermissionService) {
        this.token = this.cookieService.get('token');
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
        window.location.reload();
        // this.router.navigate(['/login']);




    }
}
