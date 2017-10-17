import { Component, OnInit, OnDestroy } from '@angular/core';
import { DriverInfoService } from './driverInfo.service';
import { DriverInfo } from './driverInfo';
import { Title } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';


@Component({
  selector: 'driverInfo-list',
  templateUrl: './driverInfo-list.component.html'
})
export class DriverInfoListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  driverInfoList: DriverInfo[] = [];

  private userObject: any;

  private subscription: Subscription;

  constructor(private driverInfoService: DriverInfoService, private titleService: Title, private modal: Modal, private userService: UserService) {
    this.titleService.setTitle('Drivers');
    this.subscription = this.userService.getUser().subscribe(response => {
      this.userObject = response;
    })
  }

  ngOnInit() {
    this.driverInfoService.list(this.userObject.token, this.userObject.apiKey).subscribe((driverInfoList: DriverInfo[]) => {
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
