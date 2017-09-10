import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CompanyService} from './company.service';
import {CompanyListComponent} from "./company-list.component";
import {CompanyShowComponent} from "./company-show.component";


@NgModule({
  declarations: [
      CompanyListComponent,
      CompanyShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule {}