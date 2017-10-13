import {Component, OnInit} from '@angular/core';
import {ForwarderInfoService} from './forwarderInfo.service';
import {ForwarderInfo} from './forwarderInfo';
import {CookieService} from 'ngx-cookie';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'forwarderInfo-list',
    templateUrl: './forwarderInfo-list.component.html'
})
export class ForwarderInfoListComponent implements OnInit {

    forwarderInfoList: ForwarderInfo[] = [];

    private token: string;

    private apiKey: string;

    constructor(private forwarderInfoService: ForwarderInfoService, private cookieService: CookieService, private modal: Modal, private titleService : Title) {
        this.token = this.cookieService.get('token');
        this.apiKey = this.cookieService.get('apiKey');
        this.titleService.setTitle('Forwarders');
    }

    ngOnInit() {
        this.forwarderInfoService.list(this.token, this.apiKey).subscribe((forwarderInfoList: ForwarderInfo[]) => {
            this.forwarderInfoList = forwarderInfoList;
        }, error => {
            let message;
            if (error.status === 401) {
                message = 'Unauthorized';
            } else if (error.status === 500) {
                message = 'Internal server error';
            }else if(error.status === 400){
                message = 'Bad request';
            }
            this.modal.alert().title('Error').message(message).open();
        });
    }
}
