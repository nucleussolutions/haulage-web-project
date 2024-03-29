import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {PermissionListComponent} from './permission-list.component';
import {PermissionPersistComponent} from './permission-persist.component';
import {PermissionShowComponent} from './permission-show.component';
import {UserService} from "../user.service";
import {PermissionService} from "./permission.service";
import {SuperAdminAndAdminPermissionGuard} from "../superadmin-and-admin-permissionguard";

const routes: Routes = [
  {path: 'permission', redirectTo: 'permission/list', pathMatch: 'full'},
  {path: 'permission/list', component: PermissionListComponent},
  {path: 'permission/create', component: PermissionPersistComponent},
  {path: 'permission/edit/:id',  component: PermissionPersistComponent},
  {path: 'permission/show/:id',  component: PermissionShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[UserService, PermissionService, SuperAdminAndAdminPermissionGuard]
})
export class PermissionRoutingModule {}