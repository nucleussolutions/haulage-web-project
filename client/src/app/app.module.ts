"use strict";

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IndexComponent} from './index/index.component';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {NavService} from './nav/nav.service';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LocationModule} from './location/location.module';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {VehicleModule} from './vehicle/vehicle.module';
import {DriverInfoModule} from './driverInfo/driverInfo.module';
import {HaulierInfoModule} from './haulierInfo/haulierInfo.module';
import {ForwarderInfoModule} from './forwarderInfo/forwarderInfo.module';
import {CompanyModule} from './company/company.module';
import {SettingsComponent} from './settings/settings.component';
import {NavDrawerComponent} from './nav-drawer/nav-drawer.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ConsignmentModule} from './consignment/consignment.module';
import {CustomerModule} from './customer/customer.module';
import {TransportRequestModule} from './transportRequest/transportRequest.module';
import {PricingModule} from './pricing/pricing.module';
import {CookieModule} from 'ngx-cookie';
import { UserComponent } from './user/user.component';


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
        SettingsComponent,
        NavDrawerComponent,
        ChangePasswordComponent,
        UserComponent,
    ],
    imports: [
        BrowserModule,
        CookieModule.forRoot(),
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
        ForwarderInfoModule,
        //CompanyModule,
        CompanyModule,
        ConsignmentModule,
        CustomerModule,
        TransportRequestModule,
        PricingModule
    ],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, NavService],
    bootstrap: [AppComponent, NavDrawerComponent]
})
export class AppModule {
}
