import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {CustomerListComponent} from './customer-list.component';
import {CustomerPersistComponent} from './customer-persist.component';
import {CustomerShowComponent} from './customer-show.component';

const routes: Routes = [
  {path: 'customer', redirectTo: 'customer/list', pathMatch: 'full'},
  {path: 'customer/list', component: CustomerListComponent},
  {path: 'customer/create', component: CustomerPersistComponent},
  {path: 'customer/edit/:id', component: CustomerPersistComponent},
  {path: 'customer/show/:id', component: CustomerShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}