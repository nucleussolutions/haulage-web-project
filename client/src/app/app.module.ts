"use strict";

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {AppComponent} from './app.component';
// import {NavComponent} from './nav/nav.component';
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
import {ModalModule} from "ngx-modialog";
import {BootstrapModalModule} from "ngx-modialog/plugins/bootstrap";
import {CreateProfileModalComponent} from './create-profile-modal/create-profile-modal.component';
import {ResendCodeComponent} from './resend-code/resend-code.component';
import {AngularFireModule} from "angularfire2";
import {environment} from "environments/environment";
import {AngularFireAuthModule} from "angularfire2/auth";
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {PermissionModule} from './permission/permission.module';
import {JobModule} from './job/job.module';
import {CreateConsignmentModalComponent} from './create-consignment-modal/create-consignment-modal.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { HelpComponent } from './help/help.component';
import { ReportingComponent } from './reporting/reporting.component';
import { QuoteModule } from './quote/quote.module';
import { LoadingComponent } from './loading/loading.component';
import { TariffModule } from './tariff/tariff.module';
import { BillingComponent } from './billing/billing.component';
import { NotificationPaneComponent } from './notification-pane/notification-pane.component';
import { SubscriptionModule } from './subscription/subscription.module';


@NgModule({
  declarations: [
    AppComponent,
    // NavComponent,
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
    CreateProfileModalComponent,
    ResendCodeComponent,
    VerifyEmailComponent,
    CreateConsignmentModalComponent,
    UnauthorizedComponent,
    HelpComponent,
    ReportingComponent,
    LoadingComponent,
    BillingComponent,
    NotificationPaneComponent,
  ],
  entryComponents: [CreateProfileModalComponent, CreateConsignmentModalComponent, LoadingComponent],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    VehicleModule,
    DriverInfoModule,
    LocationModule,
    HaulierInfoModule,
    ForwarderInfoModule,
    CompanyModule,
    ConsignmentModule,
    CustomerModule,
    TransportRequestModule,
    PricingModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PermissionModule,
    JobModule,
    NgxDatatableModule,
    QuoteModule,
    TariffModule,
    SubscriptionModule
],
  exports: [ReactiveFormsModule],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }, NavService],
  bootstrap: [AppComponent, NavDrawerComponent]
})
export class AppModule {
}
