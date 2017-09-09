import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HaulierProfileComponent } from './haulier-profile/haulier-profile.component';
import { ForwarderProfileComponent } from './forwarder-profile/forwarder-profile.component';
import { VehicleModule } from './vehicle/vehicle.module';
import { DriverInfoModule } from './driverInfo/driverInfo.module';
import { HaulierInfoModule } from './haulierInfo/haulierInfo.module';
import { ForwarderInfoModule } from './forwarderInfo/forwarderInfo.module';



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
    ResetPasswordComponent,
    HaulierProfileComponent,
    ForwarderProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    VehicleModule,
    DriverInfoModule,
    LocationModule,
    HaulierInfoModule,
    ForwarderInfoModule
],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
