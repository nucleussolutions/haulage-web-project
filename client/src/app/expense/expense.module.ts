import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ExpenseService} from './expense.service';


import {ExpenseRoutingModule} from './expense-routing.module';
import {ExpenseShowComponent} from './expense-show.component';
import {ExpenseListComponent} from './expense-list.component';
import {ExpensePersistComponent} from './expense-persist.component';
import { JobModule } from '../job/job.module';
import { ExpenseItemModule } from '../expenseItem/expenseItem.module';

@NgModule({
  declarations: [
    ExpenseListComponent,
    ExpensePersistComponent,
    ExpenseShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ExpenseRoutingModule,
    JobModule,
    ExpenseItemModule
],
  providers: [
    ExpenseService
  ]
})
export class ExpenseModule {}