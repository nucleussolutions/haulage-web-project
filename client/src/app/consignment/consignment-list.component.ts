import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html',
  providers: [UserService]
})
export class ConsignmentListComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  consignmentList: Consignment[] = [];

  private subscription : Subscription;

  constructor(private consignmentService: ConsignmentService, private modal: Modal, private router: Router, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.subscription.add(this.userService.getUser().subscribe(userObject => {
      this.checkPermissions(userObject);
    }));
  }

  checkPermissions(userObject : any) : void {
    this.subscription.add(this.permissionService.getByUserId(userObject).subscribe(permission => {
      if(permission.authority == 'Super Admin' || permission.authority == 'Admin'){
        this.consignmentService.list(userObject.token, userObject.apiKey).subscribe((consignmentList: Consignment[]) => {
          this.consignmentList = consignmentList;
        });
      }else{
        const dialog = this.modal.alert().title('Error').message('UnAuthorized').isBlocking(true).open();
        dialog.then(value => {
          this.router.navigate(['/index']);
        });
      }
    }));
  }
}
