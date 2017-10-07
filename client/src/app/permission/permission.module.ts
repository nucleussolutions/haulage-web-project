import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PermissionService} from './permission.service';


import {PermissionRoutingModule} from './permission-routing.module';
import {PermissionShowComponent} from './permission-show.component';
import {PermissionListComponent} from './permission-list.component';
import {PermissionPersistComponent} from './permission-persist.component';

@NgModule({
  declarations: [
    PermissionListComponent,
    PermissionPersistComponent,
    PermissionShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PermissionRoutingModule
  ],
  providers: [
    PermissionService
  ]
})
export class PermissionModule {}