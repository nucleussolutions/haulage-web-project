import { Component, OnInit } from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from './permission';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'app/user.service';

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html',
  providers: [UserService]
})
export class PermissionListComponent implements OnInit {

  permissionList: Permission[] = [];

  private userObject : any;

  constructor(private permissionService: PermissionService, private modal: Modal, private router: Router, private userService: UserService) {
    // this.token = this.cookieService.get('token');
    // this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {

    this.userService.getUser().subscribe(response => {
      this.userObject = response;

      this.permissionService.list(this.userObject.token, this.userObject.apiKey).subscribe((permissionList: Permission[]) => {
        this.permissionList = permissionList;
      }, error => {
        let message;

        if (error.status === 401) {
          message = 'Unauthorized';
        } else if (error.status === 500) {
          message = 'Internal server error';
        } else if (error.status === 400) {
          message = 'Bad request';
        }

        const dialog = this.modal.alert().title('Error').message(message).open();

        dialog.then(value => {
          //todo might need to navigate them back to login
          // this.cookieService.removeAll();
          // this.navDrawerService.trigger(false);
          this.router.navigate(['/login']);
        });
      });
    }, error => {
    });

  }
}
