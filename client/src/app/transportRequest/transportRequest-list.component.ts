import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';
import {CookieService} from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
    selector: 'transportRequest-list',
    templateUrl: './transportRequest-list.component.html',
    providers: [CookieService]
})
export class TransportRequestListComponent implements OnInit {

    transportRequestList: TransportRequest[] = [];

    constructor(private transportRequestService: TransportRequestService, private cookieService: CookieService, private modal : Modal) {

    }

    ngOnInit() {
        let token = this.cookieService.get('token');
        let apiKey = this.cookieService.get('apiKey');
        console.log('TransportRequestListComponent token ' + token);
        this.transportRequestService.list(token, apiKey).subscribe((transportRequestList: TransportRequest[]) => {
            this.transportRequestList = transportRequestList;
        }, error => {
            console.log('transport request list error '+error);
            this.modal.alert().title('Error').message(error).open();
        });
    }
}
