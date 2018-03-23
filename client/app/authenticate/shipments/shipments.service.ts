import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

import {Config} from '../../common/config';
import {HttpClient} from '../../common/http.client';

@Injectable()
export class ShipmentsService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get shipments
     * @param {object} params
     * */
    fnGetShipments(params?: object) {
        const urlSearchParams = new URLSearchParams();
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                urlSearchParams.set(key, params[key]);
            }
        }
        const qString = urlSearchParams.toString();
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/shipments' + (qString ? '?' + qString : ''))
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Create shipment
     * @param {object} shipmentObj
     * */
    fnCreateShipment(shipmentObj) {
        return new Promise((resolve, reject) => {
            this.http
                .post(Config.API_URL + 'api/shipments', shipmentObj)
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Delete shipment
     * @param {string} id
     **/
    fnDeleteShipment(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .delete(Config.API_URL + 'api/shipments/' + id)
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }
}
