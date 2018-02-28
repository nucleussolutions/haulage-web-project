import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {S3Service} from "./service/s3.service";
import {trigger, state, style, transition, animate} from '@angular/animations';
import {fadeInAnimation} from "./_animations";


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [UserService, S3Service],

})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  menuState:string = 'out';


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {

  }

  toggleMenu(){
// 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    console.log('menuState '+this.menuState);
  }
}
