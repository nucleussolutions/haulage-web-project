import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserInfo} from './userInfo';
import {UserInfoService} from './userInfo.service';
import {Response} from "@angular/http";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/permission';
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'userInfo-persist',
  templateUrl: './userInfo-persist.component.html'
})
export class UserInfoPersistComponent implements OnInit {

  userInfo = new UserInfo();
  create = true;
  errors: any[];
  companyList: Company[];
  permissionList: Permission[];

  private userObject: any;

  constructor(private route: ActivatedRoute, private userInfoService: UserInfoService, private router: Router, private companyService: CompanyService, private permissionService: PermissionService, private userService: UserService) {}

  ngOnInit() {

    Observable.combineLatest(this.userService.getUser(), this.route.params).flatMap(result => {
      this.userObject = result[0];

      let params = result[1];

      this.permissionService.list(this.userObject, 0).subscribe((permissionList: Permission[]) => { this.permissionList = permissionList; });

      if(params.hasOwnProperty('id')){
        return this.userInfoService.get(params['id'], this.userObject);
      }else {
        throw 'params id not found, nothing to see here';
      }
    }).subscribe((userInfo: UserInfo) => {
      this.create = false;
      this.userInfo = userInfo;
    });

  }

  save() {
    this.userInfoService.save(this.userInfo, this.userObject).subscribe((userInfo: UserInfo) => {
      this.router.navigate(['/userInfo', 'show', userInfo.id]);
    }, json => {
      console.log('json error '+JSON.stringify(json));
      if (json.hasOwnProperty('message')) {
        this.errors = json.error._embedded.errors;
        console.info('[json.error]');
      } else {
        this.errors = json._embedded.errors;
        console.info('json._embedded.errors');
      }
      console.log('this.errors '+JSON.stringify(this.errors));
    });
  }
}
