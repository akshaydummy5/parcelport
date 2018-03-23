import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../common/auth.service';

@Component({
    selector: 'pp-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

    public currentUser: any;

    constructor(private router: Router, private auth: AuthService) {
        this.currentUser = this.auth.fnGetCurrentUser();
    }

    ngOnInit() {
    }

    fnSignOut() {
        this.auth.fnSignOut()
            .then(() => {
                this.router.navigate(['/sign-in']);
            });
    }

}
