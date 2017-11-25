import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";
import {S3Service} from "./service/s3.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [UserService, S3Service]
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
