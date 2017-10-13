import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';
import {CookieService} from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'transportRequest-list',
    templateUrl: './transportRequest-list.component.html',
    providers: [CookieService]
})
export class TransportRequestListComponent implements OnInit {

    transportRequestList: TransportRequest[] = [];

    constructor(private transportRequestService: TransportRequestService, private cookieService: CookieService, private modal : Modal, private titleService : Title) {
        this.titleService.setTitle('Transport Request List');
    }

    ngOnInit() {
        let token = this.cookieService.get('token');
        let apiKey = this.cookieService.get('apiKey');
        console.log('TransportRequestListComponent token ' + token);
        this.transportRequestService.list(token, apiKey).subscribe((transportRequestList: TransportRequest[]) => {
            this.transportRequestList = transportRequestList;
        }, error => {

            let message;

            if(error.status === 401){
                message = 'Unauthorized';
            }else if(error.status === 500){
                message = 'Internal server error';
            }else if(error.status === 400){
                message = 'Bad request';
            }

            this.modal.alert().title('Error').message(message).open();
        });
    }
}
