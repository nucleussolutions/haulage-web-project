import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {LocationListComponent} from './location-list.component';
import {LocationPersistComponent} from './location-persist.component';
import {LocationShowComponent} from './location-show.component';
import {AdminOnlyPermissionGuard} from "../admin-only-permission-guard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

const routes: Routes = [
  {path: 'location', redirectTo: 'location/list', pathMatch: 'full'},
  {path: 'location/list',canActivate: [AdminOnlyPermissionGuard], component: LocationListComponent},
  {path: 'location/create',canActivate: [AdminOnlyPermissionGuard], component: LocationPersistComponent},
  {path: 'location/edit/:id',canActivate: [AdminOnlyPermissionGuard], component: LocationPersistComponent},
  {path: 'location/show/:id',canActivate: [AdminOnlyPermissionGuard], component: LocationShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService, AdminOnlyPermissionGuard]
})
export class LocationRoutingModule {}