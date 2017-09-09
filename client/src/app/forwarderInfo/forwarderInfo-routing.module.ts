import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ForwarderInfoListComponent} from './forwarderInfo-list.component';
import {ForwarderInfoPersistComponent} from './forwarderInfo-persist.component';
import {ForwarderInfoShowComponent} from './forwarderInfo-show.component';

const routes: Routes = [
  {path: 'forwarderInfo', redirectTo: 'forwarderInfo/list', pathMatch: 'full'},
  {path: 'forwarderInfo/list', component: ForwarderInfoListComponent},
  {path: 'forwarderInfo/create', component: ForwarderInfoPersistComponent},
  {path: 'forwarderInfo/edit/:id', component: ForwarderInfoPersistComponent},
  {path: 'forwarderInfo/show/:id', component: ForwarderInfoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForwarderInfoRoutingModule {}