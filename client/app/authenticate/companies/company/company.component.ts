import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Company} from '../company';
import {CompaniesService} from '../companies.service';
import {ToastrService} from '../../../common/toastr.service';

@Component({
    selector: 'pp-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

    public isDataLoaded;
    public companyObj: Company;
    public companyId: string;
    public confirmPassword: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute,
                private companiesService: CompaniesService, private toastr: ToastrService) {
        this.companyObj = {};
        this.confirmPassword = '';
        this.isDataLoaded = false;
        this.activatedRoute.params.subscribe(params => {
            this.companyId = params['id'];
        });
    }

    ngOnInit() {
        if (this.companyId !== 'add') {
            this.fnGetCompany(this.companyId);
        }
    }

    /**
     * Get company
     * @param {string} id
     * */
    fnGetCompany(id: string) {
        this.isDataLoaded = true;
        this.companiesService.fnGetCompany(id)
            .then((companyObj: Company) => {
                this.isDataLoaded = false;
                this.companyObj = companyObj;
            });
    }

    /**
     * Create/Update company
     * @param {object} companyObj
     * */
    fnSaveCompany(companyObj: Company) {
        if (companyObj._id) {
            this.companiesService.fnUpdateCompany(companyObj)
                .then(() => {
                    this.toastr.fnSuccess('Company updated successfully.');
                    this.router.navigateByUrl('/companies');
                });
        } else {
            if (companyObj.password === this.confirmPassword) {
                this.companiesService.fnCreateCompany(companyObj)
                    .then(() => {
                        this.toastr.fnSuccess('Company created successfully.');
                        this.router.navigateByUrl('/companies');
                    });
            }
        }
    }

}
