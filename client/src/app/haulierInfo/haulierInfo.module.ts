import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {HaulierInfoService} from './haulierInfo.service';


import {HaulierInfoRoutingModule} from './haulierInfo-routing.module';
import {HaulierInfoShowComponent} from './haulierInfo-show.component';
import {HaulierInfoListComponent} from './haulierInfo-list.component';
import {HaulierInfoPersistComponent} from './haulierInfo-persist.component';
import { CompanyModule } from '../company/company.module';

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
    CompanyModule
],
  providers: [
    HaulierInfoService
  ]
})
export class HaulierInfoModule {}