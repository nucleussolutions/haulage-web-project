import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserInfo} from './userInfo';
import {UserInfoService} from './userInfo.service';
import {Response} from "@angular/http";
import { CompanyService } from '../company/company.service';
import { Company } from '../company/company';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/permission';

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

  constructor(private route: ActivatedRoute, private userInfoService: UserInfoService, private router: Router, private companyService: CompanyService, private permissionService: PermissionService) {}

  ngOnInit() {
    this.companyService.list().subscribe((companyList: Company[]) => { this.companyList = companyList; });
    this.permissionService.list().subscribe((permissionList: Permission[]) => { this.permissionList = permissionList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.userInfoService.get(+params['id']).subscribe((userInfo: UserInfo) => {
          this.create = false;
          this.userInfo = userInfo;
        });
      }
    });
  }

  save() {
    this.userInfoService.save(this.userInfo).subscribe((userInfo: UserInfo) => {
      this.router.navigate(['/userInfo', 'show', userInfo.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
