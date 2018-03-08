import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {TransactionListComponent} from './transaction-list.component';
import {TransactionPersistComponent} from './transaction-persist.component';
import {TransactionShowComponent} from './transaction-show.component';

const routes: Routes = [
  {path: 'transaction', redirectTo: 'transaction/list', pathMatch: 'full'},
  {path: 'transaction/list', component: TransactionListComponent},
  {path: 'transaction/create', component: TransactionPersistComponent},
  {path: 'transaction/edit/:id', component: TransactionPersistComponent},
  {path: 'transaction/show/:id', component: TransactionShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule {}