import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url: string = state.url;
        return this.fnCheckAuthenticate(url);
    }

    fnCheckAuthenticate(url: string): boolean {

        if (this.auth.fnGetToken()) {
            if (url.indexOf('/companies') > -1) {
                if (this.auth.fnGetCurrentUser().role === 'ADMIN') {
                    return true;
                } else {
                    this.router.navigate(['/shipments']);
                    return false;
                }
            }
            if (url.indexOf('/lockers/') > -1) {
                if (this.auth.fnGetCurrentUser().role === 'ADMIN') {
                    return true;
                } else {
                    this.router.navigate(['/lockers']);
                    return false;
                }
            }
            if (url.indexOf('/slots/') > -1) {
                if (this.auth.fnGetCurrentUser().role === 'ADMIN') {
                    return true;
                } else {
                    this.router.navigate(['/slots']);
                    return false;
                }
            }
            if (url.indexOf('/shipments/') > -1) {
                if (this.auth.fnGetCurrentUser().role !== 'USER') {
                    return true;
                } else {
                    this.router.navigate(['/shipments']);
                    return false;
                }
            }
            if (url.indexOf('/users') > -1) {
                if (this.auth.fnGetCurrentUser().role === 'ADMIN' || this.auth.fnGetCurrentUser().role === 'COMPANY') {
                    return true;
                } else {
                    this.router.navigate(['/shipments']);
                    return false;
                }
            }
            return true;
        }

        this.router.navigate(['/sign-in']);
        return false;
    }

}
