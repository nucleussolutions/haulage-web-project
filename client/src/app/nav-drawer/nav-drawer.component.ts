import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {LoginService} from "../login.service";
import {AngularFireAuth} from "angularfire2/auth";


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.css'],
    providers: [LoginService]
})
export class NavDrawerComponent implements OnInit {

    private userRole: string;
    private token: any;

    private signoutResponse : any;

    constructor(private router: Router, private cookieService: CookieService, private loginService: LoginService, private firebaseAuth: AngularFireAuth) {
        this.loginService.loginStateChanged$.subscribe(loggedIn => {
            console.log('loginService loginStateChanged loggedIn '+loggedIn);
            this.token = this.cookieService.get('token');
            this.userRole = this.cookieService.get('userRole');
        })
    }

    ngOnInit() {
        this.token = this.cookieService.get('token');
        this.userRole = this.cookieService.get('userRole');
        // console.log('NavDrawerComponent token '+this.token);
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
        this.userRole = null;
        window.location.reload();
        // this.router.navigate(['/login']);




    }
}
