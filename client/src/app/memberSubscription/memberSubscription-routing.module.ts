import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {MemberSubscriptionListComponent} from './memberSubscription-list.component';
import {MemberSubscriptionPersistComponent} from './memberSubscription-persist.component';
import {MemberSubscriptionShowComponent} from './memberSubscription-show.component';

const routes: Routes = [
  {path: 'memberSubscription', redirectTo: 'memberSubscription/list', pathMatch: 'full'},
  {path: 'memberSubscription/list', component: MemberSubscriptionListComponent},
  {path: 'memberSubscription/create', component: MemberSubscriptionPersistComponent},
  {path: 'memberSubscription/edit/:id', component: MemberSubscriptionPersistComponent},
  {path: 'memberSubscription/show/:id', component: MemberSubscriptionShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberSubscriptionRoutingModule {}