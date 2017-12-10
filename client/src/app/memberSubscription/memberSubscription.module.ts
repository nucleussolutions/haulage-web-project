import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {MemberSubscriptionService} from './memberSubscription.service';


import {MemberSubscriptionRoutingModule} from './memberSubscription-routing.module';
import {MemberSubscriptionShowComponent} from './memberSubscription-show.component';
import {MemberSubscriptionListComponent} from './memberSubscription-list.component';
import {MemberSubscriptionPersistComponent} from './memberSubscription-persist.component';
import { PricingModule } from '../pricing/pricing.module';

@NgModule({
  declarations: [
    MemberSubscriptionListComponent,
    MemberSubscriptionPersistComponent,
    MemberSubscriptionShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MemberSubscriptionRoutingModule,
    PricingModule
],
  providers: [
    MemberSubscriptionService
  ]
})
export class MemberSubscriptionModule {}