import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {PricingListComponent} from './pricing-list.component';
import {PricingPersistComponent} from './pricing-persist.component';
import {PricingShowComponent} from './pricing-show.component';
import {AdminOnlyPermissionGuard} from "../admin-only-permission-guard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

const routes: Routes = [
  {path: 'pricing', redirectTo: 'pricing/list', pathMatch: 'full'},
  {path: 'pricing/list', canActivate: [AdminOnlyPermissionGuard], component: PricingListComponent},
  {path: 'pricing/create', canActivate: [AdminOnlyPermissionGuard], component: PricingPersistComponent},
  {path: 'pricing/edit/:id', canActivate: [AdminOnlyPermissionGuard], component: PricingPersistComponent},
  {path: 'pricing/show/:id', canActivate: [AdminOnlyPermissionGuard], component: PricingShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService, AdminOnlyPermissionGuard]
})
export class PricingRoutingModule {}