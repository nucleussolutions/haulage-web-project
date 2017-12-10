import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html',
})
export class ConsignmentListComponent implements OnInit {

  ngOnDestroy(): void {
  }

  consignmentList: Consignment[] = [];

  private page: number = 1;

  constructor(private route: ActivatedRoute, private consignmentService: ConsignmentService, private modal: Modal, private router: Router, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {

      let userObject = result[0];
      let params = result[1];

      return this.consignmentService.list(userObject);
    }).subscribe((consignmentList: Consignment[]) => {
      this.consignmentList = consignmentList;
    }, error => {
      this.handleError(error);
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

    dialog.result.then(result => {
      this.router.navigate(['/login']);
    });
  }
}
