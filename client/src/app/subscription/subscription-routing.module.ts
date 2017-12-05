import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SubscriptionListComponent} from './subscription-list.component';
import {SubscriptionPersistComponent} from './subscription-persist.component';
import {SubscriptionShowComponent} from './subscription-show.component';

const routes: Routes = [
  {path: 'subscription', redirectTo: 'subscription/list', pathMatch: 'full'},
  {path: 'subscription/list', component: SubscriptionListComponent},
  {path: 'subscription/create', component: SubscriptionPersistComponent},
  {path: 'subscription/edit/:id', component: SubscriptionPersistComponent},
  {path: 'subscription/show/:id', component: SubscriptionShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule {}