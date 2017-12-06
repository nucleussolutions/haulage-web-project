import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SubscriptionListComponent} from './subscription-list.component';
import {SubscriptionPersistComponent} from './subscription-persist.component';
import {SubscriptionShowComponent} from './subscription-show.component';
import {SuperAdminAndAdminPermissionGuard} from "../superadmin-and-admin-permissionguard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

const routes: Routes = [
  {path: 'subscription', redirectTo: 'subscription/list', pathMatch: 'full'},
  {path: 'subscription/list', canActivate:[SuperAdminAndAdminPermissionGuard], component: SubscriptionListComponent},
  {path: 'subscription/create', canActivate:[SuperAdminAndAdminPermissionGuard], component: SubscriptionPersistComponent},
  {path: 'subscription/edit/:id', canActivate:[SuperAdminAndAdminPermissionGuard], component: SubscriptionPersistComponent},
  {path: 'subscription/show/:id', canActivate:[SuperAdminAndAdminPermissionGuard], component: SubscriptionShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[UserService, PermissionService, SuperAdminAndAdminPermissionGuard]
})
export class SubscriptionRoutingModule {}