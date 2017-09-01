import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LocationModule } from './location/location.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import {RouterModule, Routes} from "@angular/router";
import {LocationListComponent} from "./location/location-list.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const appRoutes: Routes = [
    // { path: 'locations', component: LocationListComponent },
    // { path: 'heroes', component: HeroListComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IndexComponent,
    NotFoundComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    LocationModule,
      RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
      )
],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
