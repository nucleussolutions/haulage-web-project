import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {

  }
}
