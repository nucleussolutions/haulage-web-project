import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {JobListComponent} from './job-list.component';
import {JobPersistComponent} from './job-persist.component';
import {JobShowComponent} from './job-show.component';
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";
import {SuperAdminAndAdminPermissionGuard} from "../superadmin-and-admin-permissionguard";

const routes: Routes = [
  {path: 'job', redirectTo: 'job/list', pathMatch: 'full'},
  {path: 'job/list', canActivate: [SuperAdminAndAdminPermissionGuard], component: JobListComponent},
  {path: 'job/create', canActivate: [SuperAdminAndAdminPermissionGuard], component: JobPersistComponent},
  {path: 'job/edit/:id', canActivate: [SuperAdminAndAdminPermissionGuard], component: JobPersistComponent},
  {path: 'job/show/:id', canActivate: [SuperAdminAndAdminPermissionGuard], component: JobShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService, SuperAdminAndAdminPermissionGuard]
})
export class JobRoutingModule {}