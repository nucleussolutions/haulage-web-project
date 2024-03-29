

import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {PermissionService} from "./permission/permission.service";
import {UserService} from "./user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class SuperAdminAndManagerPermissionGuard implements CanActivate {

  constructor(private userService: UserService, private permissionService: PermissionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.userService.getUser().flatMap(userObject => this.permissionService.getByUserId(userObject)).flatMap(permissions => {
        return permissions;
      }).map(permission => resolve(permission.authority == 'Super Admin' || permission.authority == 'Manager'));
    });
  }
}