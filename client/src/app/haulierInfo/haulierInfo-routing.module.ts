import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HaulierInfoListComponent} from './haulierInfo-list.component';
import {HaulierInfoPersistComponent} from './haulierInfo-persist.component';
import {HaulierInfoShowComponent} from './haulierInfo-show.component';

const routes: Routes = [
  {path: 'haulierInfo', redirectTo: 'haulierInfo/list', pathMatch: 'full'},
  {path: 'haulierInfo/list', component: HaulierInfoListComponent},
  {path: 'haulierInfo/create', component: HaulierInfoPersistComponent},
  {path: 'haulierInfo/edit/:id', component: HaulierInfoPersistComponent},
  {path: 'haulierInfo/show/:id', component: HaulierInfoShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HaulierInfoRoutingModule {}