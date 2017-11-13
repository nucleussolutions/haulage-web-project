import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {QuoteItemService} from './quoteItem.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    QuoteItemService
  ]
})
export class QuoteItemModule {}