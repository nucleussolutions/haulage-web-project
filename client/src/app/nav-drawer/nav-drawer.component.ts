import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from 'rxjs/Subscription';
import {Permission} from "../permission/permission";
import {UserService} from 'app/user.service';


@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.css'],
  providers: [UserService]
})
export class NavDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscription: Subscription;

  private permission: Permission;

  private userObject: any;

  constructor(private permissionService: PermissionService, private userService: UserService) {

  }

  ngOnInit() {

    this.userService.userObjectUpdated$.subscribe(value => {
      console.log('user updated loggedIn '+value);
      if(!value){
        this.userObject = null;
      }
    });

    //use the permission service to get the permission of the user based on the userId
    console.log('NavDrawerComponent OnInit');

    this.subscription = this.userService.getUser().flatMap(userObject => {
      this.userObject = userObject;
      return this.permissionService.getByUserId(this.userObject);
    }).subscribe(permission => {
      this.permission = permission;
    }, error => {
      console.log('NavDrawerComponent permissionService error ' + error);
    });
  }

  logout() {
    this.userService.logout();
  }
}
