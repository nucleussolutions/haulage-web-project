import { Component, OnInit } from '@angular/core';
import { TransportRequestService } from './transportRequest.service';
import { TransportRequest } from './transportRequest';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Title } from '@angular/platform-browser';
import { UserService } from 'app/user.service';
import { Subscription } from 'rxjs/Subscription';
import { PermissionService } from 'app/permission/permission.service';


@Component({
    selector: 'transportRequest-list',
    templateUrl: './transportRequest-list.component.html',
    providers: [UserService]
})
export class TransportRequestListComponent implements OnInit {

    transportRequestList: TransportRequest[] = [];

    private subscription: Subscription;

    private userObject: any;

    private permission: any;

    constructor(private transportRequestService: TransportRequestService, private userService: UserService, private modal: Modal, private titleService: Title, private permissionService: PermissionService) {
        this.titleService.setTitle('Transport Request List');

        this.subscription = this.userService.getUser().flatMap(userObject => this.permissionService.getByUserId(userObject)).subscribe(permission => {
            this.permission = permission;
        });
    }

    ngOnInit() {
        this.transportRequestService.list(this.userObject.token, this.userObject.apiKey).subscribe((transportRequestList: TransportRequest[]) => {
            this.transportRequestList = transportRequestList;
        }, error => {

            let message;

            if (error.status === 401) {
                message = 'Unauthorized';
            } else if (error.status === 500) {
                message = 'Internal server error';
            } else if (error.status === 400) {
                message = 'Bad request';
            }

            this.modal.alert().title('Error').message(message).open();
        });
    }
}
