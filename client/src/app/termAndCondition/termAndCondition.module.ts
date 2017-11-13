import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TermAndConditionService} from './termAndCondition.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    TermAndConditionService
  ]
})
export class TermAndConditionModule {}