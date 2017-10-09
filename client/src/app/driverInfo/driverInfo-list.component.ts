import { Component, OnInit } from '@angular/core';
import { DriverInfoService } from './driverInfo.service';
import { DriverInfo } from './driverInfo';
import { Title } from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'driverInfo-list',
  templateUrl: './driverInfo-list.component.html'
})
export class DriverInfoListComponent implements OnInit {

  driverInfoList: DriverInfo[] = [];

  private token: string;

  private apiKey: string;


  constructor(private driverInfoService: DriverInfoService, private titleService: Title, private cookieService: CookieService, private modal: Modal) {
    this.titleService.setTitle('Drivers');
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.driverInfoService.list(this.token, this.apiKey).subscribe((driverInfoList: DriverInfo[]) => {
      this.driverInfoList = driverInfoList;
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }
}
