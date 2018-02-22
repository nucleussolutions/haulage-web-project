import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ExpenseItemListComponent} from './expenseItem-list.component';
import {ExpenseItemPersistComponent} from './expenseItem-persist.component';
import {ExpenseItemShowComponent} from './expenseItem-show.component';

const routes: Routes = [
  {path: 'expenseItem', redirectTo: 'expenseItem/list', pathMatch: 'full'},
  {path: 'expenseItem/list', component: ExpenseItemListComponent},
  {path: 'expenseItem/create', component: ExpenseItemPersistComponent},
  {path: 'expenseItem/edit/:id', component: ExpenseItemPersistComponent},
  {path: 'expenseItem/show/:id', component: ExpenseItemShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseItemRoutingModule {}