import {Component, OnInit} from '@angular/core';
import {ConsignmentService} from './consignment.service';
import {Consignment} from './consignment';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Router} from "@angular/router";
import {UserService} from 'app/user.service';
import {PermissionService} from "../permission/permission.service";

@Component({
  selector: 'consignment-list',
  templateUrl: './consignment-list.component.html',
  providers: [UserService]
})
export class ConsignmentListComponent implements OnInit {

  consignmentList: Consignment[] = [];
  private userObject: any;


  constructor(private consignmentService: ConsignmentService, private modal: Modal, private router: Router, private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(response => {
      this.userObject = response;

      this.permissionService.getByUserId(this.userObject.uid, this.userObject.token, this.userObject.apiKey).subscribe(permission => {
        if(permission.authority == 'Super Admin' || permission.authority == 'Admin'){
          this.consignmentService.list(this.userObject.token, this.userObject.apiKey).subscribe((consignmentList: Consignment[]) => {
            this.consignmentList = consignmentList;
          });
        }else{
          const dialog = this.modal.alert().title('Error').message('UnAuthorized').isBlocking(true).open();
          dialog.then(value => {
            this.router.navigate(['/index']);
          });
        }
      });
    });
  }
}
