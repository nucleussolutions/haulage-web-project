import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TransactionService} from './transaction.service';


import {TransactionRoutingModule} from './transaction-routing.module';
import {TransactionShowComponent} from './transaction-show.component';
import {TransactionListComponent} from './transaction-list.component';
import {TransactionPersistComponent} from './transaction-persist.component';
import { MemberSubscriptionModule } from '../memberSubscription/memberSubscription.module';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    TransactionListComponent,
    TransactionPersistComponent,
    TransactionShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransactionRoutingModule,
    MemberSubscriptionModule,
      NgbModalModule
],
  providers: [
    TransactionService
  ]
})
export class TransactionModule {}