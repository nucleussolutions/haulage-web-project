import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ConsignmentListComponent} from './consignment-list.component';
import {ConsignmentPersistComponent} from './consignment-persist.component';
import {ConsignmentShowComponent} from './consignment-show.component';

const routes: Routes = [
  {path: 'consignment', redirectTo: 'consignment/list', pathMatch: 'full'},
  {path: 'consignment/list', component: ConsignmentListComponent},
  {path: 'consignment/create', component: ConsignmentPersistComponent},
  {path: 'consignment/edit/:id', component: ConsignmentPersistComponent},
  {path: 'consignment/show/:id', component: ConsignmentShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsignmentRoutingModule {}