

import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {PermissionService} from "./permission/permission.service";
import {UserService} from "./user.service";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class AdminOnlyPermissionGuard implements CanActivate {

  constructor(private permissionService: PermissionService, private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.userService.getUser().mergeMap(userObject => this.permissionService.getByUserId(userObject)).flatMap(permissions => {
        return permissions;
      }).map(permission => resolve(permission.authority == 'Super Admin'));
    })
  }
}