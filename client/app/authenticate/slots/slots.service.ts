import {Injectable} from '@angular/core';

import {Config} from '../../common/config';
import {HttpClient} from '../../common/http.client';
import {Slot} from './slot';

@Injectable()
export class SlotsService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get list of slots
     * */
    fnGetSlots() {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/slots')
                .subscribe((response: Slot) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Get slot
     * @param {string} id
     * */
    fnGetSlot(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/slots/' + id)
                .subscribe((response: Slot) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Create new slot
     * @param {object} slotObj
     * */
    fnCreateSlot(slotObj: Slot) {
        return new Promise((resolve, reject) => {
            this.http
                .post(Config.API_URL + 'api/slots', slotObj)
                .subscribe((response: Slot) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Update slot
     * @param {object} slotObj
     * */
    fnUpdateSlot(slotObj: Slot) {
        return new Promise((resolve, reject) => {
            this.http
                .put(Config.API_URL + 'api/slots/' + slotObj._id, slotObj)
                .subscribe((response: Slot) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Delete slot
     * @param {string} id
     **/
    fnDeleteSlot(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .delete(Config.API_URL + 'api/slots/' + id)
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

}
