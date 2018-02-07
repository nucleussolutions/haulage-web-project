import {Component, OnInit} from '@angular/core';
import {UserInfoService} from './userInfo.service';
import {UserInfo} from './userInfo';

@Component({
  selector: 'userInfo-list',
  templateUrl: './userInfo-list.component.html'
})
export class UserInfoListComponent implements OnInit {

  userInfoList: UserInfo[] = [];

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit() {
    this.userInfoService.list().subscribe((userInfoList: UserInfo[]) => {
      this.userInfoList = userInfoList;
    });
  }
}
