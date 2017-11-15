import {Component, OnInit, OnDestroy} from '@angular/core';
import {DriverInfoService} from './driverInfo.service';
import {DriverInfo} from './driverInfo';
import {Title} from "@angular/platform-browser";
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Router} from "@angular/router";


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

  constructor(private driverInfoService: DriverInfoService, private titleService: Title, private modal: Modal, private userService: UserService) {
    this.titleService.setTitle('Drivers');
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => this.driverInfoService.list(userObject)).subscribe((driverInfoList: DriverInfo[]) => {
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
