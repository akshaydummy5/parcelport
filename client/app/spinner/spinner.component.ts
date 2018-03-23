import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'pp-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

    @Input() isSpinnerLoad: boolean;

    constructor() {
        this.isSpinnerLoad = false;
    }

    ngOnInit() {
    }

}
