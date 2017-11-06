import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {TransportRequestListComponent} from './transportRequest-list.component';
import {TransportRequestPersistComponent} from './transportRequest-persist.component';
import {TransportRequestShowComponent} from './transportRequest-show.component';
import {SuperAdminAndAdminPermissionGuard} from "../superadmin-and-admin-permissionguard";

const routes: Routes = [
  {path: 'transportRequest', redirectTo: 'transportRequest/list', pathMatch: 'full'},
  {path: 'transportRequest/list', component: TransportRequestListComponent},
  {path: 'transportRequest/create', canActivate:[SuperAdminAndAdminPermissionGuard], component: TransportRequestPersistComponent},
  {path: 'transportRequest/edit/:id', canActivate: [SuperAdminAndAdminPermissionGuard], component: TransportRequestPersistComponent},
  {path: 'transportRequest/show/:id', component: TransportRequestShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportRequestRoutingModule {}