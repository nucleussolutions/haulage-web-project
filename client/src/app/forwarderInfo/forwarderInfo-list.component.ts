import {Component, OnInit} from '@angular/core';
import {ForwarderInfoService} from './forwarderInfo.service';
import {ForwarderInfo} from './forwarderInfo';
import {CookieService} from 'ngx-cookie';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/user.service';


@Component({
    selector: 'forwarderInfo-list',
    templateUrl: './forwarderInfo-list.component.html'
})
export class ForwarderInfoListComponent implements OnInit {

    forwarderInfoList: ForwarderInfo[] = [];

    private subscription: Subscription;

    private userObject : any;

    constructor(private forwarderInfoService: ForwarderInfoService, private modal: Modal, private titleService : Title, private userService : UserService) {
        this.titleService.setTitle('Forwarders');
        this.subscription = this.userService.getUser().subscribe(response => {
            this.userObject = response;
        });
    }

    ngOnInit() {
        this.forwarderInfoService.list(this.userObject.token, this.userObject.apiKey).subscribe((forwarderInfoList: ForwarderInfo[]) => {
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
