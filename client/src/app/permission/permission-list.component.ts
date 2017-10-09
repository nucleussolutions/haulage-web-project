import { Component, OnInit } from '@angular/core';
import { PermissionService } from './permission.service';
import { Permission } from './permission';
import { CookieService } from 'ngx-cookie';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {

  permissionList: Permission[] = [];

  private token: string;

  private apiKey: string;

  constructor(private permissionService: PermissionService, private modal: Modal, private cookieService: CookieService) {
    this.token = this.cookieService.get('token');
    this.apiKey = this.cookieService.get('apiKey');
  }

  ngOnInit() {
    this.permissionService.list(this.token, this.apiKey).subscribe((permissionList: Permission[]) => {
      this.permissionList = permissionList;
    }, error => {
      this.modal.alert().title('Error').message(error).open();
    });
  }
}
