import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {LocationListComponent} from './location-list.component';
import {LocationPersistComponent} from './location-persist.component';
import {LocationShowComponent} from './location-show.component';

const routes: Routes = [
  {path: 'location', redirectTo: 'location/list', pathMatch: 'full'},
  {path: 'location/list', component: LocationListComponent},
  {path: 'location/create', component: LocationPersistComponent},
  {path: 'location/edit/:id', component: LocationPersistComponent},
  {path: 'location/show/:id', component: LocationShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {}