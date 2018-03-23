import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {AuthService} from '../../common/auth.service';
import {ShipmentsService} from './shipments.service';
import {Shipment} from './shipment';
import {User} from '../users/user';

@Component({
    selector: 'pp-shipments',
    templateUrl: './shipments.component.html',
    styleUrls: ['./shipments.component.css']
})

export class ShipmentsComponent implements OnInit {

    public currentUser: User;
    public isDataLoaded;
    shipmentArr: Array<Shipment> = [];

    constructor(private shipmentService: ShipmentsService, private auth: AuthService) {
        this.currentUser = this.auth.fnGetCurrentUser();
        this.isDataLoaded = false;
    }

    ngOnInit() {
        if (this.currentUser.role === 'ADMIN') {
            this.fnGetShipments();
        } else if (this.currentUser.role === 'COMPANY') {
            this.fnGetShipments({companyId: this.currentUser.companyId});
        } else if (this.currentUser.role === 'USER') {
            this.fnGetShipments({userId: this.currentUser._id});
        }
    }

    /**
     * Get Shipments
     * @param {object} params
     * */
    fnGetShipments(params?: object) {
        this.isDataLoaded = false;
        this.shipmentService.fnGetShipments(params)
            .then((shipmentArr: Array<any>) => {
                this.isDataLoaded = true;
                this.shipmentArr = shipmentArr;
            });
    }

    /**
     * DELETE Shipments
     * @param {string} id
     * */
    fnDeleteShipment(id: string) {
        if (confirm('Are you sure you want to delete this shipment?')) {
            this.shipmentService.fnDeleteShipment(id)
                .then(() => {
                    _.remove(this.shipmentArr, function (shipment) {
                        return shipment._id === id;
                    });
                });
        }
    }
}
