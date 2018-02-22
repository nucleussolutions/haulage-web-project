import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ExpenseListComponent} from './expense-list.component';
import {ExpensePersistComponent} from './expense-persist.component';
import {ExpenseShowComponent} from './expense-show.component';

const routes: Routes = [
  {path: 'expense', redirectTo: 'expense/list', pathMatch: 'full'},
  {path: 'expense/list', component: ExpenseListComponent},
  {path: 'expense/create', component: ExpensePersistComponent},
  {path: 'expense/edit/:id', component: ExpensePersistComponent},
  {path: 'expense/show/:id', component: ExpenseShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {}