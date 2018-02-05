import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LocationService} from './location.service';


import {LocationRoutingModule} from './location-routing.module';
import {LocationShowComponent} from './location-show.component';
import {LocationListComponent} from './location-list.component';
import {LocationPersistComponent} from './location-persist.component';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    LocationListComponent,
    LocationPersistComponent,
    LocationShowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LocationRoutingModule,
    PaginationModule,
      NgbModalModule
  ],
  providers: [
    LocationService
  ]
})
export class LocationModule {}