import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {QuoteListComponent} from './quote-list.component';
import {QuotePersistComponent} from './quote-persist.component';
import {QuoteShowComponent} from './quote-show.component';

const routes: Routes = [
  {path: 'quote', redirectTo: 'quote/list', pathMatch: 'full'},
  {path: 'quote/list', component: QuoteListComponent},
  {path: 'quote/create', component: QuotePersistComponent},
  {path: 'quote/edit/:id', component: QuotePersistComponent},
  {path: 'quote/show/:id', component: QuoteShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule {}