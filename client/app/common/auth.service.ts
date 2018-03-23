import {Injectable} from '@angular/core';

import {Config} from './config';
import {Cookie} from './cookie';
import {HttpClient} from './http.client';
import {User} from '../authenticate/users/user';

@Injectable()
export class AuthService {

    private currentUser: User;
    private token: string;

    constructor(private http: HttpClient, private cookie: Cookie) {
        if (this.cookie.get('AUTH_TOKEN')) {
            const _obj = JSON.parse(atob(this.cookie.get('AUTH_TOKEN')));
            this.currentUser = _obj.user;
            this.token = _obj.token;
        }
    }

    /**
     * User sign in.
     * @param {object} obj
     * */
    fnSignIn(obj: any) {
        return new Promise((resolve, reject) => {
            this.http
                .post(Config.API_URL + 'api/auth/login', obj)
                .subscribe((response) => {
                    this.currentUser = response['user'];
                    this.token = response['token'];
                    this.cookie.set('AUTH_TOKEN', btoa(JSON.stringify(response)));
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * User sign out.
     * */
    fnSignOut() {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/auth/logout')
                .subscribe((response) => {
                    this.currentUser = {};
                    this.token = '';
                    this.cookie.delete('AUTH_TOKEN');
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Get Current user.
     * */
    fnGetCurrentUser() {
        return this.currentUser;
    }

    /**
     * Get API access token.
     * */
    fnGetToken() {
        return this.token;
    }
}
