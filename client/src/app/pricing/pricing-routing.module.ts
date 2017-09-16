import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {PricingListComponent} from './pricing-list.component';
import {PricingPersistComponent} from './pricing-persist.component';
import {PricingShowComponent} from './pricing-show.component';

const routes: Routes = [
  {path: 'pricing', redirectTo: 'pricing/list', pathMatch: 'full'},
  {path: 'pricing/list', component: PricingListComponent},
  {path: 'pricing/create', component: PricingPersistComponent},
  {path: 'pricing/edit/:id', component: PricingPersistComponent},
  {path: 'pricing/show/:id', component: PricingShowComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule {}