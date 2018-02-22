import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ExpenseItemService} from './expenseItem.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    ExpenseItemService
  ]
})
export class ExpenseItemModule {}