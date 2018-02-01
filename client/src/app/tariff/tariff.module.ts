import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TariffService} from './tariff.service';


import {TariffRoutingModule} from './tariff-routing.module';
import {TariffShowComponent} from './tariff-show.component';
import {TariffListComponent} from './tariff-list.component';
import {TariffPersistComponent} from './tariff-persist.component';
import { LocationModule } from '../location/location.module';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    TariffListComponent,
    TariffPersistComponent,
    TariffShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TariffRoutingModule,
    LocationModule,
    PaginationModule,
    NgbTypeaheadModule
],
  providers: [
    TariffService
  ]
})
export class TariffModule {}