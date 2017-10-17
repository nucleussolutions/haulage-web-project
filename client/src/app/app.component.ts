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

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit() {
        console.log('AppComponent ngAfterViewInit i dont know what this does');
    }
}
