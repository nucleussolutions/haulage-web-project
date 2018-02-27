import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {


    this.route.queryParams.flatMap(queryParams  => {
         let mode = queryParams['mode'];
         let oobCode = queryParams['oobCode'];
      return this.userService.verifyEmailWithCode(oobCode);
    }).subscribe(value => {

    });
  }

}
