import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../common/auth.service';
import {ToastrService} from '../common/toastr.service';

interface SignIn {
    email: string;
    password: string;
}

@Component({
    selector: 'pp-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

    signInObj: SignIn;

    constructor(private router: Router, private auth: AuthService, private toastr: ToastrService) {
        this.signInObj = {
            email: '',
            password: ''
        };
    }

    ngOnInit() {
    }

    fnSignIn(signInObj: SignIn) {
        this.auth.fnSignIn(signInObj)
            .then(() => {
                this.toastr.fnSuccess('Welcome to Parcel Port!');
                this.router.navigate(['/shipments']);
            })
            .catch((error) => {
                this.toastr.fnError(error.message);
            });
    }

}
