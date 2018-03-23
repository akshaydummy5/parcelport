import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

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

import {AuthenticateGuard} from './common/authenticate.guard';
import {NotAuthenticateGuard} from './common/not.authenticate.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/shipments', pathMatch: 'full'},
    {
        path: '', component: AuthenticateComponent, canActivate: [AuthenticateGuard],
        children: [
            {path: 'companies', component: CompaniesComponent, canActivate: [AuthenticateGuard]},
            {path: 'companies/:id', component: CompanyComponent, canActivate: [AuthenticateGuard]},
            {path: 'lockers', component: LockersComponent, canActivate: [AuthenticateGuard]},
            {path: 'lockers/:id', component: LockerComponent, canActivate: [AuthenticateGuard]},
            {path: 'slots', component: SlotsComponent, canActivate: [AuthenticateGuard]},
            {path: 'slots/:id', component: SlotComponent, canActivate: [AuthenticateGuard]},
            {path: 'shipments', component: ShipmentsComponent, canActivate: [AuthenticateGuard]},
            {path: 'shipments/:id', component: ShipmentComponent, canActivate: [AuthenticateGuard]},
            {path: 'users', component: UsersComponent, canActivate: [AuthenticateGuard]},
            {path: 'users/:id', component: UserComponent, canActivate: [AuthenticateGuard]}
        ]
    },
    {path: 'sign-in', component: SignInComponent, canActivate: [NotAuthenticateGuard]}
];

export const AppRoutingProviders: any[] = [];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
