import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CustomerService} from './customer.service';


import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerShowComponent} from './customer-show.component';
import {CustomerListComponent} from './customer-list.component';
import {CustomerPersistComponent} from './customer-persist.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerPersistComponent,
    CustomerShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule
  ],
  providers: [
    CustomerService
  ]
})
export class CustomerModule {}