import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {UserInfoListComponent} from './userInfo-list.component';
import {UserInfoPersistComponent} from './userInfo-persist.component';
import {UserInfoShowComponent} from './userInfo-show.component';

const routes: Routes = [
  {path: 'userInfo', redirectTo: 'userInfo/list', pathMatch: 'full'},
  {path: 'userInfo/list', component: UserInfoListComponent},
  {path: 'userInfo/create', component: UserInfoPersistComponent},
  {path: 'userInfo/edit/:id', component: UserInfoPersistComponent},
  {path: 'userInfo/show/:id', component: UserInfoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule {}