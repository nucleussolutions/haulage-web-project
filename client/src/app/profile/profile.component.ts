import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUser().flatMap( userObject => {
      return this.userService.getAccountInfo(userObject.apiKey, userObject.token);
    }).subscribe(value => {

      this.user = value.users[0]



    });

  }

}
