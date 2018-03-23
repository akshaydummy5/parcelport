import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {UsersService} from './users.service';
import {AuthService} from '../../common/auth.service';
import {User} from './user';

@Component({
    selector: 'pp-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

    public isDataLoaded;
    public currentUser: User;
    public usersArr: Array<User> = [];

    constructor(private usersService: UsersService, private auth: AuthService) {
        this.currentUser = this.auth.fnGetCurrentUser();
    }

    ngOnInit() {
        if (this.currentUser.role === 'ADMIN') {
            this.fnGetUsers();
        } else if (this.currentUser.role === 'COMPANY') {
            this.fnGetUsers({companyId: this.currentUser.companyId});
        }
    }

    /**
     * Get list of users
     * @param {object} params
     * */
    fnGetUsers(params?: object) {
        this.isDataLoaded = false;
        this.usersService.fnGetUsers(params)
            .then((usersArr: Array<User>) => {
                this.isDataLoaded = true;
                this.usersArr = usersArr;
            });
    }

    /**
     * Delete user
     * @param {string} id
     * */
    fnDeleteUser(id: string) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.usersService.fnDeleteUser(id)
                .then(() => {
                    _.remove(this.usersArr, function (user) {
                        return user._id === id;
                    });
                });
        }
    }

    /**
     * Check user role for edit and delete user
     * @param {string} role
     * */
    fnCheckUserRoleForEdit(role) {
        let flag = true;
        switch (role) {
            case 'ADMIN':
                flag = false;
                break;
            case 'COMPANY':
                flag = this.currentUser.role === 'ADMIN';
                break;
            default:
                flag = true;
        }
        return flag;
    }
}
