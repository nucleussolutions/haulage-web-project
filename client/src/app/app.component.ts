import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {S3Service} from "./service/s3.service";
import {trigger, state, style, transition, animate} from '@angular/animations';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [UserService, S3Service],
  animations:  [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
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

  toggleMenu(){

  }
}
