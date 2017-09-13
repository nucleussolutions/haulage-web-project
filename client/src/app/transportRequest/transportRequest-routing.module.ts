import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {TransportRequestListComponent} from './transportRequest-list.component';
import {TransportRequestPersistComponent} from './transportRequest-persist.component';
import {TransportRequestShowComponent} from './transportRequest-show.component';

const routes: Routes = [
  {path: 'transportRequest', redirectTo: 'transportRequest/list', pathMatch: 'full'},
  {path: 'transportRequest/list', component: TransportRequestListComponent},
  {path: 'transportRequest/create', component: TransportRequestPersistComponent},
  {path: 'transportRequest/edit/:id', component: TransportRequestPersistComponent},
  {path: 'transportRequest/show/:id', component: TransportRequestShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRequestRoutingModule {}