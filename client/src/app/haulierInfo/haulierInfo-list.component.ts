import {Component, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html'
})
export class HaulierInfoListComponent implements OnInit {

  haulierInfoList: HaulierInfo[] = [];

  private token : string;

  private apiKey : string;

  constructor(private haulierInfoService: HaulierInfoService, private cookieService : CookieService, private modal : Modal) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.haulierInfoService.list(this.token, this.apiKey).subscribe((haulierInfoList: HaulierInfo[]) => {
      this.haulierInfoList = haulierInfoList;
    }, error => {
      this.modal.alert().title('Error').message(error).open();
      //todo navigate to the login page again
    });
  }
}
