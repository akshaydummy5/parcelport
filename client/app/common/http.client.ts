import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { Cookie } from './cookie';

@Injectable()
export class HttpClient {

    constructor(private router: Router, private http: Http, private cookie: Cookie) {
    }

    /**
     * GET HTTP Request.
     * @param {string} url
     * @param {object} options
     * */
    get(url: string, options?: object): Observable<any> {
        const headers = new Headers();
        this.fnCreateAuthorizationHeader(headers);
        return this.http.get(url, _.assign({}, options, {headers: headers}))
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.fnStatusCodeError(error);
                return Observable.throw(error.json() || 'Server error');
            });
    }

    /**
     * POST HTTP Request.
     * @param {string} url
     * @param {object} body
     * @param {object} options
     * */
    post(url: string, body: object, options?: object): Observable<any> {
        const headers = new Headers();
        this.fnCreateAuthorizationHeader(headers);
        return this.http.post(url, body, _.assign({}, options, {headers: headers}))
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.fnStatusCodeError(error);
                return Observable.throw(error.json() || 'Server error');
            });
    }

    /**
     * PUT HTTP Request.
     * @param {string} url
     * @param {object} body
     * @param {object} options
     * */
    put(url: string, body: object, options?: object): Observable<any> {
        const headers = new Headers();
        this.fnCreateAuthorizationHeader(headers);
        return this.http.put(url, body, _.assign({}, options, {headers: headers}))
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.fnStatusCodeError(error);
                return Observable.throw(error.json() || 'Server error');
            });
    }

    /**
     * DELETE HTTP Request.
     * @param {string} url
     * @param {object} options
     * */
    delete(url: string, options?: object): Observable<any> {
        const headers = new Headers();
        this.fnCreateAuthorizationHeader(headers);
        return this.http.delete(url, _.assign({}, options, {headers: headers}))
            .map((response: Response) => response.json())
            .catch((error: any) => {
                this.fnStatusCodeError(error);
                return Observable.throw(error.json() || 'Server error');
            });
    }

    /**
     * Set auth token in each http request.
     * @param {object} headers
     * */
    private fnCreateAuthorizationHeader(headers: Headers) {
        if (this.cookie.get('AUTH_TOKEN')) {
            const _obj = JSON.parse(atob(this.cookie.get('AUTH_TOKEN')));
            headers.append('Authorization', 'Bearer ' + _obj.token);
        }
    }

    /**
     * Status code error.
     * @param {object} error
     * */
    private fnStatusCodeError(error) {
        switch (error.status) {
            case 401:
                this.cookie.delete('AUTH_TOKEN');
                this.router.navigate(['/sign-in']);
                console.log(error);
                break;
            default:
                console.log(error);
        }
    }
}
