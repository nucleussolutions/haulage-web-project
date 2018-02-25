import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {QuoteItemListComponent} from './quoteItem-list.component';
import {QuoteItemPersistComponent} from './quoteItem-persist.component';
import {QuoteItemShowComponent} from './quoteItem-show.component';

// const routes: Routes = [
//   {path: 'quoteItem', redirectTo: 'quoteItem/list', pathMatch: 'full'},
//   {path: 'quoteItem/list', component: QuoteItemListComponent},
//   {path: 'quoteItem/create', component: QuoteItemPersistComponent},
//   {path: 'quoteItem/edit/:id', component: QuoteItemPersistComponent},
//   {path: 'quoteItem/show/:id', component: QuoteItemShowComponent},
// ];
//
// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class QuoteItemRoutingModule {}