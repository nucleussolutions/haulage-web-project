import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ForwarderInfoListComponent} from './forwarderInfo-list.component';
import {ForwarderInfoPersistComponent} from './forwarderInfo-persist.component';
import {ForwarderInfoShowComponent} from './forwarderInfo-show.component';
import {RestrictUserPermissionGuard} from "../restrict-user-permission-guard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

const routes: Routes = [
  {path: 'forwarderInfo', redirectTo: 'forwarderInfo/list', pathMatch: 'full'},
  {path: 'forwarderInfo/list', canActivate: [],  component: ForwarderInfoListComponent},
  {path: 'forwarderInfo/create', canActivate: [], component: ForwarderInfoPersistComponent},
  {path: 'forwarderInfo/edit/:id', canActivate: [], component: ForwarderInfoPersistComponent},
  {path: 'forwarderInfo/show/:id', canActivate: [], component: ForwarderInfoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService]
})
export class ForwarderInfoRoutingModule {}