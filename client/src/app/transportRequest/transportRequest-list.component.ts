import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'transportRequest-list',
  templateUrl: './transportRequest-list.component.html',
  providers: [CookieService]
})
export class TransportRequestListComponent implements OnInit {

  transportRequestList: TransportRequest[] = [];

  constructor(private transportRequestService: TransportRequestService, private cookieService : CookieService) {

   }

  ngOnInit() {
    let token = this.cookieService.get('token');
    let apiKey = this.cookieService.get('apiKey');
    console.log('TransportRequestListComponent token '+token);
    if(token){
      this.transportRequestService.list(token, apiKey).subscribe((transportRequestList: TransportRequest[]) => {
        this.transportRequestList = transportRequestList;
      });
    }
  }
}
