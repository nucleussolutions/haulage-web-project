import {Component, EventEmitter, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie';


@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private token : string;
    private userRole : string;

    constructor(private cookieService: CookieService) {

    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        this.token = this.cookieService.get('token');
        this.userRole = this.cookieService.get('userRole');
    }

}
