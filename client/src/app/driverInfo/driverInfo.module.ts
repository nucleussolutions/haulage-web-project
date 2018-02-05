import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {DriverInfoService} from './driverInfo.service';


import {DriverInfoRoutingModule} from './driverInfo-routing.module';
import {DriverInfoShowComponent} from './driverInfo-show.component';
import {DriverInfoListComponent} from './driverInfo-list.component';
import {DriverInfoPersistComponent} from './driverInfo-persist.component';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    DriverInfoListComponent,
    DriverInfoPersistComponent,
    DriverInfoShowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DriverInfoRoutingModule,
    PaginationModule,
    NgbModalModule
  ],
  providers: [
    DriverInfoService
  ]
})
export class DriverInfoModule {}