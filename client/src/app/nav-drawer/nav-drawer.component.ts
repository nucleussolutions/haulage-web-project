import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from 'rxjs/Subscription';
import {Permission} from "../permission/permission";
import {UserService} from 'app/user.service';
import {Observable} from "rxjs/Observable";
import {UserInfoService} from "../userInfo/userInfo.service";


@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.css'],
})
export class NavDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }

  permissions: Permission[];

  superAdminPermission: any;

  managerPermission: any;

  adminPermission: any;

  userPermission: any;

  private userObject: any;

  constructor(private permissionService: PermissionService, private userService: UserService, private userInfoService: UserInfoService) {

  }

  ngOnInit() {
    console.log('NavDrawerComponent OnInit');
    this.callForUserObjectAndPermission();
  }

  private callForUserObjectAndPermission() {
    this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      console.log('userObject ' + JSON.stringify(userObject));
      return this.permissionService.getByUserId(this.userObject);
    }).subscribe(permissions => {
      this.permissions = permissions;
      this.superAdminPermission = this.permissions.find(permission => permission.authority == 'Super Admin');
      this.adminPermission = this.permissions.find(permission => permission.authority == 'Admin');
      this.managerPermission = this.permissions.find(permission => permission.authority == 'Manager');
      this.userPermission = this.permissions.find(permission => permission.authority == 'User');
    });
  }

  logout() {
    this.userService.logout();
  }
}
