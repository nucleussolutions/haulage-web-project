'use strict';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {IndexComponent} from './index/index.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LocationModule} from './location/location.module';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
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
import {CreateProfileModalComponent} from './create-profile-modal/create-profile-modal.component';
import {ResendCodeComponent} from './resend-code/resend-code.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from 'environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthActionComponent} from './auth-action/auth-action.component';
import {PermissionModule} from './permission/permission.module';
import {JobModule} from './job/job.module';
import {CreateConsignmentModalComponent} from './create-consignment-modal/create-consignment-modal.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HelpComponent } from './help/help.component';
import { ReportingComponent } from './reporting/reporting.component';
import { QuoteModule } from './quote/quote.module';
import { LoadingComponent } from './loading/loading.component';
import { TariffModule } from './tariff/tariff.module';
import { BillingComponent } from './billing/billing.component';
import { NotificationPaneComponent } from './notification-pane/notification-pane.component';
import { MemberSubscriptionModule } from './memberSubscription/memberSubscription.module';
import {PaginationModule} from './pagination/pagination.module';
import { ConsignmentTemplateComponent } from './consignment-template/consignment-template.component';
import { QuotationTemplateComponent } from './quotation-template/quotation-template.component';
import {AgmCoreModule} from "@agm/core";
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { CreateCompanyModalComponent } from './create-company-modal/create-company-modal.component';
import { GeneralModalComponent } from './general-modal/general-modal.component';
import { UserInfoModule } from './userInfo/userInfo.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseItemModule } from './expenseItem/expenseItem.module';
import { QuoteItemModule } from './quoteItem/quoteItem.module';
import { QuoteItemModalComponent } from './quote-item-modal/quote-item-modal.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ForwarderInfoModalComponent } from './forwarder-info-modal/forwarder-info-modal.component';
import { LogoutComponent } from './logout/logout.component';
import { TransactionModule } from './transaction/transaction.module';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotFoundComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    ForgetPasswordComponent,
    SettingsComponent,
    NavDrawerComponent,
    ChangePasswordComponent,
    CreateProfileModalComponent,
    ResendCodeComponent,
    AuthActionComponent,
    CreateConsignmentModalComponent,
    UnauthorizedComponent,
    HelpComponent,
    ReportingComponent,
    LoadingComponent,
    BillingComponent,
    NotificationPaneComponent,
    ConsignmentTemplateComponent,
    QuotationTemplateComponent,
    CreateCompanyModalComponent,
    GeneralModalComponent,
    NavbarComponent,
    QuoteItemModalComponent,
    ForwarderInfoModalComponent,
    LogoutComponent,
  ],
  entryComponents: [CreateProfileModalComponent, CreateConsignmentModalComponent, LoadingComponent, GeneralModalComponent, CreateCompanyModalComponent],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    PermissionModule,
    JobModule,
    NgxDatatableModule,
    QuoteModule,
    TariffModule,
    MemberSubscriptionModule,
    PaginationModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({apiKey:'AIzaSyDwrBvVQ4vb99X-IUAn0ntKOK3zv4hokxc'}),
    UserInfoModule,
    ExpenseModule,
    ExpenseItemModule,
    QuoteItemModule,
    BrowserAnimationsModule,
    TransactionModule
],
  exports: [ReactiveFormsModule],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }],
  bootstrap: [AppComponent, NavDrawerComponent, NavbarComponent]
})
export class AppModule {
}
