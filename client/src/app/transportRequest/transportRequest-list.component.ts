import {Component, OnInit} from '@angular/core';
import {TransportRequestService} from './transportRequest.service';
import {TransportRequest} from './transportRequest';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Title} from '@angular/platform-browser';
import {UserService} from 'app/user.service';
import {Subscription} from 'rxjs/Subscription';
import {PermissionService} from 'app/permission/permission.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'transportRequest-list',
  templateUrl: './transportRequest-list.component.html',
})
export class TransportRequestListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transportRequestList: TransportRequest[] = [];

  private subscription: Subscription;

  private permission: any;

  constructor(private transportRequestService: TransportRequestService, private userService: UserService, private modal: Modal, private titleService: Title, private permissionService: PermissionService) {
    this.titleService.setTitle('Transport Request List');
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().flatMap(userObject => {
      this.listTransportRequests(userObject);
      console.log('transport request list userobject '+JSON.stringify(userObject));
      return this.permissionService.getByUserId(userObject);
    }).subscribe(permission => {
      this.permission = permission;
    }, error => {
      console.log('transport request list permission error '+JSON.stringify(error));
    });
  }

  listTransportRequests(userObject: any){
    this.transportRequestService.list(userObject).subscribe((transportRequestList: TransportRequest[]) => {
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
