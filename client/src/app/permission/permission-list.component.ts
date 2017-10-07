import {Component, OnInit} from '@angular/core';
import {PermissionService} from './permission.service';
import {Permission} from './permission';

@Component({
  selector: 'permission-list',
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {

  permissionList: Permission[] = [];

  constructor(private permissionService: PermissionService) { }

  ngOnInit() {
    this.permissionService.list().subscribe((permissionList: Permission[]) => {
      this.permissionList = permissionList;
    });
  }
}
