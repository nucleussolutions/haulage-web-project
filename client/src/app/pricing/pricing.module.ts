import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PricingService} from './pricing.service';


import {PricingRoutingModule} from './pricing-routing.module';
import {PricingShowComponent} from './pricing-show.component';
import {PricingListComponent} from './pricing-list.component';
import {PricingPersistComponent} from './pricing-persist.component';

@NgModule({
  declarations: [
    PricingListComponent,
    PricingPersistComponent,
    PricingShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PricingRoutingModule
  ],
  providers: [
    PricingService
  ]
})
export class PricingModule {}