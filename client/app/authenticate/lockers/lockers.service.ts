import {Injectable} from '@angular/core';

import {Config} from '../../common/config';
import {HttpClient} from '../../common/http.client';
import {Locker} from './locker';

@Injectable()
export class LockersService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get list of lockers
     * */
    fnGetLockers() {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/lockers')
                .subscribe((response: Locker) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Get locker
     * @param {string} id
     * */
    fnGetLocker(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/lockers/' + id)
                .subscribe((response: Locker) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Create new locker
     * @param {object} lockerObj
     * */
    fnCreateLocker(lockerObj: Locker) {
        return new Promise((resolve, reject) => {
            this.http
                .post(Config.API_URL + 'api/lockers', lockerObj)
                .subscribe((response: Locker) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Update locker
     * @param {object} lockerObj
     * */
    fnUpdateLocker(lockerObj: Locker) {
        return new Promise((resolve, reject) => {
            this.http
                .put(Config.API_URL + 'api/lockers/' + lockerObj._id, lockerObj)
                .subscribe((response: Locker) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Delete locker
     * @param {string} id
     **/
    fnDeleteLocker(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .delete(Config.API_URL + 'api/lockers/' + id)
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

}
