import {Component, OnInit} from '@angular/core';
import {ForwarderInfoService} from './forwarderInfo.service';
import {ForwarderInfo} from './forwarderInfo';
import {CookieService} from 'ngx-cookie';
import {Modal} from 'ngx-modialog/plugins/bootstrap';


@Component({
    selector: 'forwarderInfo-list',
    templateUrl: './forwarderInfo-list.component.html'
})
export class ForwarderInfoListComponent implements OnInit {

    forwarderInfoList: ForwarderInfo[] = [];

    private token: string;

    private apiKey: string;

    constructor(private forwarderInfoService: ForwarderInfoService, private cookieService: CookieService, private modal: Modal) {
        this.token = this.cookieService.get('token');
        this.apiKey = this.cookieService.get('apiKey');
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
            }
            this.modal.alert().title('Error').message(message).open();
        });
    }
}
