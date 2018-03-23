import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {AuthService} from '../../common/auth.service';
import {LockersService} from './lockers.service';
import {Locker} from './locker';
import {User} from '../users/user';

@Component({
    selector: 'pp-lockers',
    templateUrl: './lockers.component.html',
    styleUrls: ['./lockers.component.css']
})
export class LockersComponent implements OnInit {

    public isDataLoaded;
    public currentUser: User;
    public lockersArr: Array<Locker> = [];

    constructor(private lockersService: LockersService, private auth: AuthService) {
        this.currentUser = this.auth.fnGetCurrentUser();
        this.isDataLoaded = false;
    }

    ngOnInit() {
        this.fnGetLockers();
    }

    /**
     * Get list of lockers
     * */
    fnGetLockers() {
        this.isDataLoaded = false;
        this.lockersService.fnGetLockers()
            .then((lockersArr: Array<Locker>) => {
                this.isDataLoaded = true;
                this.lockersArr = lockersArr;
            });
    }

    /**
     * Delete locker
     * @param {string} id
     * */
    fnDeleteLocker(id: string) {
        if (confirm('Are you sure you want to delete this locker?')) {
            this.lockersService.fnDeleteLocker(id)
                .then(() => {
                    _.remove(this.lockersArr, function (locker) {
                        return locker._id === id;
                    });
                });
        }
    }
}
