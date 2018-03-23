import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {CompaniesService} from './companies.service';
import {Company} from './company';

@Component({
    selector: 'pp-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {

    public isDataLoaded;
    companiesArr: Array<Company> = [];

    constructor(private companiesService: CompaniesService) {
        this.isDataLoaded = false;
    }

    ngOnInit() {
        this.fnGetCompanies();
    }

    /**
     * Get list of companies
     * */
    fnGetCompanies() {
        this.isDataLoaded = false;
        this.companiesService.fnGetCompanies()
            .then((companiesArr: Array<Company>) => {
                this.isDataLoaded = true;
                this.companiesArr = companiesArr;
            });
    }

    /**
     * Delete company
     * @param {string} id
     * */
    fnDeleteCompany(id: string) {
        if (confirm('Are you sure you want to delete this company?')) {
            this.companiesService.fnDeleteCompany(id)
                .then(() => {
                    _.remove(this.companiesArr, function (company) {
                        return company._id === id;
                    });
                });
        }
    }
}
