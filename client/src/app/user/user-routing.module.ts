import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

const routes: Routes = [
    {path: 'user', redirectTo: 'User/list', pathMatch: 'full'},
    {path: 'user/list', component: UserListComponent},
    {path: 'user/create', component: UserPersistComponent},
    {path: 'user/edit/:id', component: UserPersistComponent},
    {path: 'user/show/:id', component: UserShowComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}