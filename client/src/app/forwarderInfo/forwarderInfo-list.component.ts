import {Component, OnInit} from '@angular/core';
import {ForwarderInfoService} from './forwarderInfo.service';
import {ForwarderInfo} from './forwarderInfo';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'forwarderInfo-list',
  templateUrl: './forwarderInfo-list.component.html'
})
export class ForwarderInfoListComponent implements OnInit {

  forwarderInfoList: ForwarderInfo[] = [];

  private token : string;

  private apiKey : string;

  constructor(private forwarderInfoService: ForwarderInfoService, private cookieService : CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.forwarderInfoService.list(this.token, this.apiKey).subscribe((forwarderInfoList: ForwarderInfo[]) => {
      this.forwarderInfoList = forwarderInfoList;
    });
  }
}
