import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {UserInfoService} from "../userInfo/userInfo.service";
import {UserInfo} from "../userInfo/userInfo";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private userObject: any;

  userInfo: UserInfo;

  constructor(private userService: UserService, private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.userInfoService.getByUserId(this.userObject);
    }).subscribe(userInfo => {
      this.userInfo = userInfo;
      console.log('navbar userInfo '+this.userInfo);
    });
  }

}
