import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";
import {PermissionService} from "./permission/permission.service";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {Injectable} from "@angular/core";

@Injectable()
export class RestrictUserPermissionGuard implements CanActivate {

  constructor(private userService: UserService, private permissionService: PermissionService) {

  }

  //restricts drivers from logging into the system
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.userService.getUser().flatMap(userObject => this.permissionService.getByUserId(userObject)).subscribe(permission => {
        resolve(permission.authority !== 'User');
      });
    });
  }
}