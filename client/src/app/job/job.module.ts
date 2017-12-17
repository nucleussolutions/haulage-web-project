import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {JobService} from './job.service';


import {JobRoutingModule} from './job-routing.module';
import {JobShowComponent} from './job-show.component';
import {JobListComponent} from './job-list.component';
import {JobPersistComponent} from './job-persist.component';
import { ConsignmentModule } from '../consignment/consignment.module';
import {PaginationModule} from "../pagination/pagination.module";

@NgModule({
  declarations: [
    JobListComponent,
    JobPersistComponent,
    JobShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobRoutingModule,
    ConsignmentModule,
    PaginationModule
],
  providers: [
    JobService
  ]
})
export class JobModule {}