import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SubscriptionService} from './subscription.service';


import {SubscriptionRoutingModule} from './subscription-routing.module';
import {SubscriptionShowComponent} from './subscription-show.component';
import {SubscriptionListComponent} from './subscription-list.component';
import {SubscriptionPersistComponent} from './subscription-persist.component';
import { PricingModule } from '../pricing/pricing.module';

@NgModule({
  declarations: [
    SubscriptionListComponent,
    SubscriptionPersistComponent,
    SubscriptionShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubscriptionRoutingModule,
    PricingModule
],
  providers: [
    SubscriptionService
  ]
})
export class SubscriptionModule {}