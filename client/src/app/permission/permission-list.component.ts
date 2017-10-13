import { Component, OnInit } from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from './permission';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { Router } from '@angular/router';
import { NavDrawerService } from 'app/nav-drawer.service';

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {

  permissionList: Permission[] = [];

  private token: string;

  private apiKey: string;

  constructor(private permissionService: PermissionService, private modal: Modal, private cookieService: CookieService, private router: Router, private navDrawerService: NavDrawerService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.permissionService.list(this.token, this.apiKey).subscribe((permissionList: Permission[]) => {
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
        this.cookieService.removeAll();
        this.navDrawerService.trigger(false);
        this.router.navigate(['/login']);
      });
    });
  }
}
