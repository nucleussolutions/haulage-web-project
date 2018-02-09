import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionService} from "../permission/permission.service";
import {Subscription} from 'rxjs/Subscription';
import {Permission} from "../permission/permission";
import {UserService} from 'app/user.service';
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.css'],
})
export class NavDrawerComponent implements OnInit, OnDestroy, AfterViewInit {

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    if(this.subscription){
      // foo could get resolved and it's defined
      this.subscription.unsubscribe();
    }
  }

  private subscription: Subscription;

  private permissions: Permission[];

  superAdminPermission : any;

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
      console.log('userObject '+JSON.stringify(userObject));
      return this.permissionService.getByUserId(this.userObject);
    }).subscribe(json => {
      let data = json['data'];

      this.permissions = [];

      data.forEach(permissionDatum => {
        let permission = new Permission(permissionDatum.attributes);
        permission.id = permissionDatum.id;
        this.permissions.push(permission);

        this.permissions.forEach(permission => {
          if(permission.authority == 'Super Admin'){
            this.superAdminPermission = permission;
          }
        })
      });
    });
  }

  logout() {
    this.userService.logout();
  }
}
