import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";
import {LoginService} from "../login.service";


@Component({
    selector: 'app-nav-drawer',
    templateUrl: './nav-drawer.component.html',
    styleUrls: ['./nav-drawer.component.css'],
    providers: [LoginService]
})
export class NavDrawerComponent implements OnInit {

    private userRole: string;
    private token: any;

    constructor(private router: Router, private cookieService: CookieService, private loginService: LoginService) {
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
        //clear cookies from the cookieservice
        this.cookieService.remove('userId');
        this.cookieService.remove('token');
        this.cookieService.remove('userRole');
        this.cookieService.removeAll();
        this.token = null;
        this.userRole = null;
        window.location.reload();
        // this.router.navigate(['/login']);
    }
}
