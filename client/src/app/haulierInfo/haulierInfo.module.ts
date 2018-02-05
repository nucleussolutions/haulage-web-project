import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HaulierInfoService} from './haulierInfo.service';


import {HaulierInfoRoutingModule} from './haulierInfo-routing.module';
import {HaulierInfoShowComponent} from './haulierInfo-show.component';
import {HaulierInfoListComponent} from './haulierInfo-list.component';
import {HaulierInfoPersistComponent} from './haulierInfo-persist.component';
import { CompanyModule } from '../company/company.module';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbModalModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    HaulierInfoListComponent,
    HaulierInfoPersistComponent,
    HaulierInfoShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HaulierInfoRoutingModule,
    CompanyModule,
    PaginationModule,
    NgbTypeaheadModule,
      NgbModalModule
],
  providers: [
    HaulierInfoService
  ]
})
export class HaulierInfoModule {}