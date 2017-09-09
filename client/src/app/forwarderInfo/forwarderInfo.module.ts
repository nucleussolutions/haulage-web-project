import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ForwarderInfoService} from './forwarderInfo.service';


import {ForwarderInfoRoutingModule} from './forwarderInfo-routing.module';
import {ForwarderInfoShowComponent} from './forwarderInfo-show.component';
import {ForwarderInfoListComponent} from './forwarderInfo-list.component';
import {ForwarderInfoPersistComponent} from './forwarderInfo-persist.component';
import { CompanyModule } from '../company/company.module';

@NgModule({
  declarations: [
    ForwarderInfoListComponent,
    ForwarderInfoPersistComponent,
    ForwarderInfoShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ForwarderInfoRoutingModule,
    CompanyModule
],
  providers: [
    ForwarderInfoService
  ]
})
export class ForwarderInfoModule {}