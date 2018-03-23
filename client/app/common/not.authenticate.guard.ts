import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Cookie} from './cookie';

@Injectable()
export class NotAuthenticateGuard implements CanActivate {

    constructor(private router: Router, private cookie: Cookie) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url: string = state.url;
        return this.fnCheckAuthenticate(url);
    }

    fnCheckAuthenticate(url: string): boolean {

        if (!this.cookie.get('AUTH_TOKEN')) {
            return true;
        }

        this.router.navigate(['/shipments']);
        return false;
    }

}
