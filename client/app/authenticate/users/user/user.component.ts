import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {User} from '../user';
import {Company} from '../../companies/company';
import {UsersService} from '../users.service';
import {AuthService} from '../../../common/auth.service';
import {CompaniesService} from '../../companies/companies.service';
import {ToastrService} from '../../../common/toastr.service';

@Component({
    selector: 'pp-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    public isDataLoaded;
    public currentUser: User;
    public userObj: User;
    public userId: string;
    public confirmPassword: string;
    public companiesArr: Array<Company> = [];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
                private usersService: UsersService, private auth: AuthService,
                private companiesService: CompaniesService) {
        this.isDataLoaded = false;
        this.userObj = {companyId: '', role: ''};
        this.confirmPassword = '';
        this.currentUser = this.auth.fnGetCurrentUser();
        this.activatedRoute.params.subscribe(params => {
            this.userId = params['id'];
        });
    }

    ngOnInit() {
        if (this.currentUser.role === 'ADMIN') {
            this.fnGetCompanies();
        } else {
            if (this.userId !== 'add') {
                this.isDataLoaded = true;
                this.fnGetUser(this.userId);
            }
        }
    }

    /**
     * Get user
     * @param {string} id
     * */
    fnGetUser(id: string) {
        this.usersService.fnGetUser(id)
            .then((userObj: User) => {
                this.isDataLoaded = false;
                this.userObj = userObj;
            });
    }

    /**
     * Get companies
     * */
    fnGetCompanies() {
        this.isDataLoaded = true;
        this.companiesService.fnGetCompanies()
            .then((companiesArr: Array<Company>) => {
                this.companiesArr = companiesArr;
                this.companiesArr.unshift({_id: '', company: 'Select Company'});
                if (this.userId !== 'add') {
                    this.fnGetUser(this.userId);
                } else {
                    this.isDataLoaded = false;
                }
            });
    }

    /**
     * Create/Update user
     * @param {object} userObj
     * */
    fnSaveUser(userObj: User) {
        if (userObj._id) {
            this.usersService.fnUpdateUser(userObj)
                .then(() => {
                    this.toastr.fnSuccess('User updated successfully.');
                    this.router.navigateByUrl('/users');
                });
        } else {
            if (userObj.password === this.confirmPassword) {
                if (!userObj.companyId) {
                    userObj.companyId = this.currentUser.companyId;
                }
                this.usersService.fnCreateUser(userObj)
                    .then(() => {
                        this.toastr.fnSuccess('User created successfully.');
                        this.router.navigateByUrl('/users');
                    });
            }
        }
    }

}
