import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {PermissionService} from "./permission/permission.service";
import {UserService} from "./user.service";
import {Permission} from "./permission/permission";
import {environment} from "../environments/environment";

@Injectable()
export class PermissionsInterceptor implements HttpInterceptor {

  private permission: Permission;

  constructor(private permissionService: PermissionService, private userService: UserService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.userService.getUser().subscribe(userObject => {
      this.checkPermissions(userObject);
    });

    console.log('req.url '+req.url);

    console.log('environment.serverUrl '+environment.serverUrl);

    // This is a duplicate. It is exactly the same as the original.
    const dupReq = req.clone({
      url: environment.serverUrl + '/unauthorized'
    });

    if (req.url.includes('consignment')) {
      if(this.permission.authority == 'Manager' || this.permission.authority == 'User'){
        return next.handle(dupReq);
      }
    } else if (req.url.includes('job')) {
      if(this.permission.authority == 'Manager' || this.permission.authority == 'User'){
        return next.handle(dupReq);
      }
    } else if (req.url.includes('haulierInfo')) {
      if(this.permission.authority == 'User'){
        return next.handle(dupReq);
      }
    } else if (req.url.includes('driverInfo')) {

      if (this.permission.authority == 'Manager' || this.permission.authority == 'User') {
        //restrict access
        return next.handle(dupReq);
      }

    } else if (req.url.includes('location')) {
      if (this.permission.authority !== 'Super Admin') {
        //restrict access
      }
    }else if(req.url.includes('index')){

    }else if(req.url.includes('pricing')){
      if (this.permission.authority !== 'Super Admin') {
        //restrict access
        return next.handle(dupReq);
      }
    }else if(req.url.includes('customer')){

    }else if(req.url.includes('forwarderInfo')){
      if (this.permission.authority == 'Manager' || this.permission.authority == 'User') {
        //restrict access
        return next.handle(dupReq);
      }
    }else if(req.url.includes('permission')){
      if (this.permission.authority !== 'Super Admin') {
        //restrict access
        return next.handle(dupReq);
      }
    }

    return next.handle(req);
  }

  checkPermissions(userObject): void {
    this.permissionService.getByUserId(userObject.uid).subscribe(permission => {
      this.permission = permission;
    });
  }


}