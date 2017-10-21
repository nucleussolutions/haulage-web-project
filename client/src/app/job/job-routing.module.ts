import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {JobListComponent} from './job-list.component';
import {JobPersistComponent} from './job-persist.component';
import {JobShowComponent} from './job-show.component';

const routes: Routes = [
  {path: 'job', redirectTo: 'job/list', pathMatch: 'full'},
  {path: 'job/list', component: JobListComponent},
  {path: 'job/create', component: JobPersistComponent},
  {path: 'job/edit/:id', component: JobPersistComponent},
  {path: 'job/show/:id', component: JobShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule {}