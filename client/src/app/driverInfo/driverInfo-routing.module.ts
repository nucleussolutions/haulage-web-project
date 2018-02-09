import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {DriverInfoListComponent} from './driverInfo-list.component';
import {DriverInfoPersistComponent} from './driverInfo-persist.component';
import {DriverInfoShowComponent} from './driverInfo-show.component';
import {SuperAdminAndAdminPermissionGuard} from "../superadmin-and-admin-permissionguard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

const routes: Routes = [
  {path: 'driverInfo', redirectTo: 'driverInfo/list', pathMatch: 'full'},
  {path: 'driverInfo/list', component: DriverInfoListComponent},
  {path: 'driverInfo/create', component: DriverInfoPersistComponent},
  {path: 'driverInfo/edit/:id', component: DriverInfoPersistComponent},
  {path: 'driverInfo/show/:id', component: DriverInfoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService, SuperAdminAndAdminPermissionGuard]
})
export class DriverInfoRoutingModule {}