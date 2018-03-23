import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {AuthService} from '../../common/auth.service';
import {SlotsService} from './slots.service';
import {Slot} from './slot';
import {User} from '../users/user';

@Component({
    selector: 'pp-slots',
    templateUrl: './slots.component.html',
    styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {

    public isDataLoaded;
    public currentUser: User;
    public slotsArr: Array<Slot> = [];

    constructor(private slotsService: SlotsService, private auth: AuthService) {
        this.currentUser = this.auth.fnGetCurrentUser();
        this.isDataLoaded = false;
    }

    ngOnInit() {
        this.fnGetSlots();
    }

    /**
     * Get list of slots
     * */
    fnGetSlots() {
        this.isDataLoaded = false;
        this.slotsService.fnGetSlots()
            .then((slotsArr: Array<Slot>) => {
                this.isDataLoaded = true;
                this.slotsArr = slotsArr;
            });
    }

    /**
     * Delete slot
     * @param {string} id
     * */
    fnDeleteSlot(id: string) {
        if (confirm('Are you sure you want to delete this slot?')) {
            this.slotsService.fnDeleteSlot(id)
                .then(() => {
                    _.remove(this.slotsArr, function (slot) {
                        return slot._id === id;
                    });
                });
        }
    }
}
