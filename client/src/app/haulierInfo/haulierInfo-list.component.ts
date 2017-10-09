import {Component, OnInit} from '@angular/core';
import {HaulierInfoService} from './haulierInfo.service';
import {HaulierInfo} from './haulierInfo';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'haulierInfo-list',
  templateUrl: './haulierInfo-list.component.html'
})
export class HaulierInfoListComponent implements OnInit {

  haulierInfoList: HaulierInfo[] = [];

  private token : string;

  private apiKey : string;

  constructor(private haulierInfoService: HaulierInfoService, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.haulierInfoService.list(this.token, this.apiKey).subscribe((haulierInfoList: HaulierInfo[]) => {
      this.haulierInfoList = haulierInfoList;
    });
  }
}
