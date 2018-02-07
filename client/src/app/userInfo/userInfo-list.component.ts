import {Component, OnInit} from '@angular/core';
import {UserInfoService} from './userInfo.service';
import {UserInfo} from './userInfo';
import {UserService} from "../user.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {Vehicle} from "../vehicle/vehicle";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModalComponent} from "../general-modal/general-modal.component";

@Component({
  selector: 'userInfo-list',
  templateUrl: './userInfo-list.component.html'
})
export class UserInfoListComponent implements OnInit {

  userInfoList: UserInfo[] = [];

  private subscription: Subscription;

  private userObject: any;

  private page: number = 1;

  offset: number = 0;

  count: number = 0;

  limit: number = 10;

  constructor(private userInfoService: UserInfoService, private userService: UserService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.queryParams).flatMap(result => {
      this.userObject = result[0];
      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }
      this.offset = (this.page - 1) * this.limit;

      this.userInfoService.count(this.userObject).subscribe(count => {
        this.count = count;
      });

      return this.userInfoService.list(this.userObject, this.offset);
    }).subscribe(json => {
      let data = json['data'];
      this.userInfoList = [];
      data.forEach(userInfoDatum => {
        let userInfo = new UserInfo(userInfoDatum.attributes);
        userInfo.id = userInfoDatum.id;
        this.userInfoList.push(userInfo);
      });

    }, error => {
      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      console.log('error.status ' + error.status);
      const errorModalRef = this.modalService.open(GeneralModalComponent);
      errorModalRef.componentInstance.modalTitle = 'Error';
      errorModalRef.componentInstance.modalMessage = message;
    });

  }
}
