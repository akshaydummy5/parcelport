import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as _ from 'lodash';

import {AuthService} from '../../../common/auth.service';
import {ToastrService} from '../../../common/toastr.service';
import {UsersService} from '../../users/users.service';
import {ShipmentsService} from '../shipments.service';
import {CompaniesService} from '../../companies/companies.service';
import {Shipment} from '../shipment';
import {User} from '../../users/user';
import {Company} from '../../companies/company';

@Component({
    selector: 'pp-shipment',
    templateUrl: './shipment.component.html',
    styleUrls: ['./shipment.component.css']
})

export class ShipmentComponent implements OnInit {

    public isDataLoaded;
    public currentUser: User;
    public shipmentObj: Shipment;
    public usersArr: any = [{_id: '', firstName: 'Select', lastName: ' User'}];
    public companiesArr: Array<Company> = [];

    constructor(private router: Router, private auth: AuthService, private toastr: ToastrService,
                private usersService: UsersService, private shipmentService: ShipmentsService,
                private companiesService: CompaniesService) {
        this.isDataLoaded = false;
        this.currentUser = this.auth.fnGetCurrentUser();
        this.shipmentObj = {
            packages: [{
                label: new Date().getTime().toString(32).toUpperCase(),
                size: 'SMALL',
                status: 'In Transit'
            }],
            userId: '',
            companyId: '',
            receiver: {
                name: '',
                email: '',
                phone: ''
            }
        };
    }

    ngOnInit() {
        if (this.currentUser.role === 'ADMIN') {
            this.fnGetCompanies();
        } else if (this.currentUser.role === 'COMPANY') {
            this.isDataLoaded = true;
            this.fnGetUsers({companyId: this.currentUser.companyId});
        }
    }

    /**
     * Add more package in single shipment.
     * @param {object} packages
     * */
    fnAddMorePackage(packages) {
        packages.push({
            label: new Date().getTime().toString(32).toUpperCase(),
            size: 'SMALL',
            status: 'In Transit'
        });
    };

    /**
     * Remove package from array.
     * @param {object} packages
     * @param {string} label
     * */
    fnRemovePackage(packages, label) {
        _.remove(packages, (_package) => {
            return _package.label === label;
        });
    };

    /**
     * Get list of users
     * @param {object} params
     * */
    fnGetUsers(params?: object) {
        this.usersService.fnGetUsers(params)
            .then((usersArr: Array<User>) => {
                this.isDataLoaded = false;
                this.usersArr = _.filter(usersArr, function (user) {
                    return user.role === 'USER';
                });
                this.usersArr.unshift({_id: '', firstName: 'Select', lastName: 'User'});
            });
    }

    /**
     * Get companies
     * */
    fnGetCompanies() {
        this.isDataLoaded = true;
        this.companiesService.fnGetCompanies()
            .then((companiesArr: Array<Company>) => {
                this.isDataLoaded = false;
                this.companiesArr = companiesArr;
                this.companiesArr.unshift({_id: '', company: 'Select Company'});
            });
    }

    /**
     * Create/Update shipment
     * @param {object} shipmentObj
     * */
    fnSaveShipment(shipmentObj: Shipment) {
        shipmentObj.sender = shipmentObj.userId;
        shipmentObj.receiverEmail = shipmentObj.receiver.email;
        shipmentObj.receiverPhone = shipmentObj.receiver.phone;
        if (shipmentObj._id) {
        } else {
            if (!shipmentObj.companyId) {
                shipmentObj.companyId = this.currentUser.companyId;
            }
            this.shipmentService.fnCreateShipment(shipmentObj)
                .then(() => {
                    this.toastr.fnSuccess('Shipment created successfully.');
                    this.router.navigateByUrl('/shipments');
                });
        }
    }
}
