import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";

const appRoutes: Routes = [
    {path: 'forget-password', component: ForgetPasswordComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'index', component: IndexComponent, children:[
    ]
    },
    {path: '', redirectTo: '/index', pathMatch: 'full'},
    // {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        enableTracing: true, // <-- debugging purposes only
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}