import {Component, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html'
})
export class HaulierInfoListComponent implements OnInit {

  haulierInfoList: HaulierInfo[] = [];

  private token : string;

  private apiKey : string;

  constructor(private haulierInfoService: HaulierInfoService, private cookieService : CookieService, private modal : Modal, private titleService: Title) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
    this.titleService.setTitle('Hauliers');
  }

  ngOnInit() {
    this.haulierInfoService.list(this.token, this.apiKey).subscribe((haulierInfoList: HaulierInfo[]) => {
      this.haulierInfoList = haulierInfoList;
    }, error => {

      let message;

      if(error.status === 401){
        message = 'Unauthorized';
      }else if(error.status === 500){
        message = 'Internal server error';
      }

      this.modal.alert().title('Error').message(message).open();

    });
  }
}
