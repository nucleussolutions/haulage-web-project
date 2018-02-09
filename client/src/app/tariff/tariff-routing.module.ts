import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {TariffListComponent} from './tariff-list.component';
import {TariffPersistComponent} from './tariff-persist.component';
import {TariffShowComponent} from './tariff-show.component';
import {AdminOnlyPermissionGuard} from "../admin-only-permission-guard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";

const routes: Routes = [
  {path: 'tariff', redirectTo: 'tariff/list', pathMatch: 'full'},
  {path: 'tariff/list', component: TariffListComponent},
  {path: 'tariff/create', component: TariffPersistComponent},
  {path: 'tariff/edit/:id', component: TariffPersistComponent},
  {path: 'tariff/show/:id', component: TariffShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService, AdminOnlyPermissionGuard]
})
export class TariffRoutingModule {}