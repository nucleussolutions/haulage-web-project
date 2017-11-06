import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";
import {PermissionService} from "./permission/permission.service";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

export class RestrictUserPermissionGuard implements CanActivate {

  constructor(private userService: UserService, private permissionService: PermissionService) {

  }

  //restricts drivers from logging into the system
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getUser().flatMap(userObject => this.permissionService.getByUserId(userObject)).flatMap(permission => {
      if(permission.authority !== 'User'){
        return Observable.of(true);
      }else{
        return Observable.of(false);
      }
    }).catch(error => {
      console.log('RestrictUserPermissionGuard error '+error);
      return Observable.of(false);
    });
  }
}