import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {Cookie} from './common/cookie';
import {HttpClient} from './common/http.client';
import {AuthService} from './common/auth.service';
import {AuthenticateGuard} from './common/authenticate.guard';
import {NotAuthenticateGuard} from './common/not.authenticate.guard';
import {ToastrService} from './common/toastr.service';
import {ShipmentsService} from './authenticate/shipments/shipments.service';
import {UsersService} from './authenticate/users/users.service';
import {CompaniesService} from './authenticate/companies/companies.service';
import {LockersService} from './authenticate/lockers/lockers.service';
import {SlotsService} from './authenticate/slots/slots.service';

import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {ShipmentsComponent} from './authenticate/shipments/shipments.component';
import {ShipmentComponent} from './authenticate/shipments/shipment/shipment.component';
import {UsersComponent} from './authenticate/users/users.component';
import {UserComponent} from './authenticate/users/user/user.component';
import {CompaniesComponent} from './authenticate/companies/companies.component';
import {CompanyComponent} from './authenticate/companies/company/company.component';
import {LockersComponent} from './authenticate/lockers/lockers.component';
import {LockerComponent} from './authenticate/lockers/locker/locker.component';
import {SlotsComponent} from './authenticate/slots/slots.component';
import {SlotComponent} from './authenticate/slots/slot/slot.component';
import {SpinnerComponent} from './spinner/spinner.component';

import {Routing, AppRoutingProviders} from './app.route';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        AuthenticateComponent,
        ShipmentsComponent,
        ShipmentComponent,
        UsersComponent,
        UserComponent,
        CompaniesComponent,
        CompanyComponent,
        LockersComponent,
        LockerComponent,
        SlotsComponent,
        SlotComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        Routing,
        FormsModule,
        HttpModule
    ],
    providers: [
        AppRoutingProviders,
        Cookie,
        HttpClient,
        AuthService,
        AuthenticateGuard,
        NotAuthenticateGuard,
        ShipmentsService,
        UsersService,
        CompaniesService,
        LockersService,
        SlotsService,
        ToastrService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
