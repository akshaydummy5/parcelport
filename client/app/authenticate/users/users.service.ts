import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

import {Config} from '../../common/config';
import {HttpClient} from '../../common/http.client';
import {User} from './user';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get list of users
     * @param {object} params
     * */
    fnGetUsers(params?: object) {
        const urlSearchParams = new URLSearchParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                urlSearchParams.set(key, params[key]);
            }
        }
        const qString = urlSearchParams.toString();
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/users' + (qString ? '?' + qString : ''))
                .subscribe((response: User) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Get user
     * @param {string} id
     * */
    fnGetUser(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/users/' + id)
                .subscribe((response: User) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Create new user
     * @param {object} userObj
     * */
    fnCreateUser(userObj: User) {
        return new Promise((resolve, reject) => {
            this.http
                .post(Config.API_URL + 'api/users', userObj)
                .subscribe((response: User) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Update user
     * @param {object} userObj
     * */
    fnUpdateUser(userObj: User) {
        return new Promise((resolve, reject) => {
            this.http
                .put(Config.API_URL + 'api/users/' + userObj._id, userObj)
                .subscribe((response: User) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Delete user
     * @param {string} id
     **/
    fnDeleteUser(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .delete(Config.API_URL + 'api/users/' + id)
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

}
