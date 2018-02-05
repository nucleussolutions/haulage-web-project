import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ConsignmentService} from './consignment.service';


import {ConsignmentRoutingModule} from './consignment-routing.module';
import {ConsignmentShowComponent} from './consignment-show.component';
import {ConsignmentListComponent} from './consignment-list.component';
import {ConsignmentPersistComponent} from './consignment-persist.component';
import { LocationModule } from '../location/location.module';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ConsignmentListComponent,
    ConsignmentPersistComponent,
    ConsignmentShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ConsignmentRoutingModule,
    LocationModule,
    PaginationModule,
      NgbModalModule
],
  providers: [
    ConsignmentService
  ]
})
export class ConsignmentModule {}