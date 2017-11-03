import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {PermissionService} from "./permission/permission.service";
import {UserService} from "./user.service";

@Injectable()
export class CanActivateViaPermissionGuard implements CanActivate {

  constructor(private permissionService: PermissionService, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(resolve => {
      this.userService.getUser().flatMap(userObject => this.permissionService.getByUserId(userObject)).subscribe(permission => {
        resolve(permission.authority == 'Super Admin' || permission.authority == 'Admin');
      });
    })
  }
}