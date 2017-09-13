import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TransportRequestService} from './transportRequest.service';


import {TransportRequestRoutingModule} from './transportRequest-routing.module';
import {TransportRequestShowComponent} from './transportRequest-show.component';
import {TransportRequestListComponent} from './transportRequest-list.component';
import {TransportRequestPersistComponent} from './transportRequest-persist.component';
import { LocationModule } from '../location/location.module';
import { ConsignmentModule } from '../consignment/consignment.module';
import { CustomerModule } from '../customer/customer.module';

@NgModule({
  declarations: [
    TransportRequestListComponent,
    TransportRequestPersistComponent,
    TransportRequestShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransportRequestRoutingModule,
    LocationModule,
    ConsignmentModule,
    CustomerModule
],
  providers: [
    TransportRequestService
  ]
})
export class TransportRequestModule {}