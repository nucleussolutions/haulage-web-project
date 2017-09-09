import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {VehicleService} from './vehicle.service';


import {VehicleRoutingModule} from './vehicle-routing.module';
import {VehicleShowComponent} from './vehicle-show.component';
import {VehicleListComponent} from './vehicle-list.component';
import {VehiclePersistComponent} from './vehicle-persist.component';

@NgModule({
  declarations: [
    VehicleListComponent,
    VehiclePersistComponent,
    VehicleShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    VehicleRoutingModule
  ],
  providers: [
    VehicleService
  ]
})
export class VehicleModule {}