import {Injectable} from '@angular/core';

import {Config} from '../../common/config';
import {HttpClient} from '../../common/http.client';
import {Company} from './company';

@Injectable()
export class CompaniesService {

    constructor(private http: HttpClient) {
    }

    /**
     * Get list of companies
     * */
    fnGetCompanies() {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/companies')
                .subscribe((response: Company) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Get company
     * @param {string} id
     * */
    fnGetCompany(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(Config.API_URL + 'api/companies/' + id)
                .subscribe((response: Company) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Create new company
     * @param {object} companyObj
     * */
    fnCreateCompany(companyObj: Company) {
        return new Promise((resolve, reject) => {
            this.http
                .post(Config.API_URL + 'api/companies', companyObj)
                .subscribe((response: Company) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Update company
     * @param {object} companyObj
     * */
    fnUpdateCompany(companyObj: Company) {
        return new Promise((resolve, reject) => {
            this.http
                .put(Config.API_URL + 'api/companies/' + companyObj._id, companyObj)
                .subscribe((response: Company) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * Delete company
     * @param {string} id
     **/
    fnDeleteCompany(id: string) {
        return new Promise((resolve, reject) => {
            this.http
                .delete(Config.API_URL + 'api/companies/' + id)
                .subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

}
