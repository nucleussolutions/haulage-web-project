import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {UserInfoService} from './userInfo.service';


import {UserInfoRoutingModule} from './userInfo-routing.module';
import {UserInfoShowComponent} from './userInfo-show.component';
import {UserInfoListComponent} from './userInfo-list.component';
import {UserInfoPersistComponent} from './userInfo-persist.component';
import { CompanyModule } from '../company/company.module';
import { PermissionModule } from '../permission/permission.module';

@NgModule({
  declarations: [
    UserInfoListComponent,
    UserInfoPersistComponent,
    UserInfoShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserInfoRoutingModule,
    CompanyModule,
    PermissionModule
],
  providers: [
    UserInfoService
  ]
})
export class UserInfoModule {}