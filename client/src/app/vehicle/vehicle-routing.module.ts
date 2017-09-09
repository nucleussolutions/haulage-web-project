import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {VehicleListComponent} from './vehicle-list.component';
import {VehiclePersistComponent} from './vehicle-persist.component';
import {VehicleShowComponent} from './vehicle-show.component';

const routes: Routes = [
  {path: 'vehicle', redirectTo: 'vehicle/list', pathMatch: 'full'},
  {path: 'vehicle/list', component: VehicleListComponent},
  {path: 'vehicle/create', component: VehiclePersistComponent},
  {path: 'vehicle/edit/:id', component: VehiclePersistComponent},
  {path: 'vehicle/show/:id', component: VehicleShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {}