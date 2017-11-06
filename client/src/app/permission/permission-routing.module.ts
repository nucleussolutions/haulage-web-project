import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {PermissionListComponent} from './permission-list.component';
import {PermissionPersistComponent} from './permission-persist.component';
import {PermissionShowComponent} from './permission-show.component';

const routes: Routes = [
  {path: 'permission', redirectTo: 'permission/list', pathMatch: 'full'},
  {path: 'permission/list', canActivate:[], component: PermissionListComponent},
  {path: 'permission/create', canActivate:[], component: PermissionPersistComponent},
  {path: 'permission/edit/:id', component: PermissionPersistComponent},
  {path: 'permission/show/:id', component: PermissionShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule {}