import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {QuoteListComponent} from './quote-list.component';
import {QuotePersistComponent} from './quote-persist.component';
import {QuoteShowComponent} from './quote-show.component';
import {SuperAdminAndManagerPermissionGuard} from "../superadmin-and-manager-permission-guard";
import {RestrictUserPermissionGuard} from "../restrict-user-permission-guard";
import {UserService} from "../user.service";
import {PermissionService} from "../permission/permission.service";
import {QuotationTemplateComponent} from "../quotation-template/quotation-template.component";

const routes: Routes = [
  {path: 'quote', redirectTo: 'quote/list', pathMatch: 'full'},
  {path: 'quote/list', component: QuoteListComponent},
  {path: 'quote/create', component: QuotePersistComponent},
  {path: 'quote/edit/:id', component: QuotePersistComponent},
  {path: 'quote/show/:id', component: QuoteShowComponent},
  {path: 'quote/printpreview/:id', component: QuotationTemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, PermissionService, RestrictUserPermissionGuard, SuperAdminAndManagerPermissionGuard]
})
export class QuoteRoutingModule {}