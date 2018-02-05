import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PricingService} from './pricing.service';


import {PricingRoutingModule} from './pricing-routing.module';
import {PricingShowComponent} from './pricing-show.component';
import {PricingListComponent} from './pricing-list.component';
import {PricingPersistComponent} from './pricing-persist.component';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    PricingListComponent,
    PricingPersistComponent,
    PricingShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PricingRoutingModule,
    PaginationModule,
      NgbModalModule
  ],
  providers: [
    PricingService
  ]
})
export class PricingModule {}