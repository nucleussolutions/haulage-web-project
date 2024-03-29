import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {QuoteService} from './quote.service';


import {QuoteRoutingModule} from './quote-routing.module';
import {QuoteShowComponent} from './quote-show.component';
import {QuoteListComponent} from './quote-list.component';
import {QuotePersistComponent} from './quote-persist.component';
import { TermAndConditionModule } from '../termAndCondition/termAndCondition.module';
import { QuoteItemModule } from '../quoteItem/quoteItem.module';
import {PaginationModule} from "../pagination/pagination.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";

@NgModule({
  declarations: [
    QuoteListComponent,
    QuotePersistComponent,
    QuoteShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuoteRoutingModule,
    TermAndConditionModule,
    QuoteItemModule,
    PaginationModule,
    NgbModule,
    NgxDatatableModule
],
  providers: [
    QuoteService
  ]
})
export class QuoteModule {}