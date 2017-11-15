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
})
export class ConsignmentListComponent implements OnInit {

  ngOnDestroy(): void {
  }

  consignmentList: Consignment[] = [];

  constructor(private consignmentService: ConsignmentService, private modal: Modal, private router: Router, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    console.log('ConsignmentListComponent onInit');
    this.userService.getUser().subscribe(userObject => {
      this.consignmentService.list(userObject).subscribe((consignmentList: Consignment[]) => {
        this.consignmentList = consignmentList;
      }, error => {
        this.handleError(error);
      });
    });
  }

  private handleError(error) {
    let message;

    if (error.status === 401) {
      message = 'Unauthorized';
    } else if (error.status === 500) {
      message = "Internal server error";
    } else if (error.status === 400) {
      message = 'Bad request';
    }

    const dialog = this.modal.alert().isBlocking(true).title('Error').message(message).open();

    dialog.then(value => {
      this.router.navigate(['/login']);
    });
  }
}
