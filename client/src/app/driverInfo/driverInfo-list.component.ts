import {Component, OnInit, OnDestroy} from '@angular/core';
import {DriverInfoService} from './driverInfo.service';
import {DriverInfo} from './driverInfo';
import {Title} from "@angular/platform-browser";
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'driverInfo-list',
  templateUrl: './driverInfo-list.component.html',
})
export class DriverInfoListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  driverInfoList: DriverInfo[] = [];

  private subscription: Subscription;

  private page : number = 0;

  constructor(private route: ActivatedRoute, private driverInfoService: DriverInfoService, private titleService: Title, private modal: Modal, private userService: UserService) {
    this.titleService.setTitle('Drivers');
  }

  ngOnInit() {

    this.subscription = Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];

      let params = result[1];

      if (params['page']) {
        this.page = params['page'];
      }

      return this.driverInfoService.list(userObject, this.page);
    }).subscribe((driverInfoList: DriverInfo[]) => {
      this.driverInfoList = driverInfoList;
    }, error => {

      let message;

      if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.status === 400) {
        message = 'Bad request';
      }

      this.modal.alert().title('Error').message(message).open();
    });
  }
}
