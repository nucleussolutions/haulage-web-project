import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {CompanyListComponent} from './company-list.component';
import {CompanyPersistComponent} from './company-persist.component';
import {CompanyShowComponent} from './company-show.component';

const routes: Routes = [
  {path: 'company', redirectTo: 'company/list', pathMatch: 'full'},
  {path: 'company/list', component: CompanyListComponent},
  {path: 'company/create', component: CompanyPersistComponent},
  {path: 'company/edit/:id', component: CompanyPersistComponent},
  {path: 'company/show/:id', component: CompanyShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}