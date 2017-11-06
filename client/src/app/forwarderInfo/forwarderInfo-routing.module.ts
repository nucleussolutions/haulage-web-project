import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ForwarderInfoListComponent} from './forwarderInfo-list.component';
import {ForwarderInfoPersistComponent} from './forwarderInfo-persist.component';
import {ForwarderInfoShowComponent} from './forwarderInfo-show.component';
import {RestrictUserPermissionGuard} from "../restrict-user-permission-guard";

const routes: Routes = [
  {path: 'forwarderInfo', redirectTo: 'forwarderInfo/list', pathMatch: 'full'},
  {path: 'forwarderInfo/list', canActivate: [RestrictUserPermissionGuard],  component: ForwarderInfoListComponent},
  {path: 'forwarderInfo/create', canActivate: [RestrictUserPermissionGuard], component: ForwarderInfoPersistComponent},
  {path: 'forwarderInfo/edit/:id', canActivate: [RestrictUserPermissionGuard], component: ForwarderInfoPersistComponent},
  {path: 'forwarderInfo/show/:id', canActivate: [], component: ForwarderInfoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForwarderInfoRoutingModule {}