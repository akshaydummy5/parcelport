import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Slot} from '../slot';
import {Locker} from '../../lockers/locker';
import {SlotsService} from '../slots.service';
import {LockersService} from '../../lockers/lockers.service';
import {ToastrService} from '../../../common/toastr.service';

@Component({
    selector: 'pp-slot',
    templateUrl: './slot.component.html',
    styleUrls: ['./slot.component.css']
})

export class SlotComponent implements OnInit {

    public isDataLoaded;
    public currentSlot: Slot;
    public slotObj: Slot;
    public slotId: string;
    public lockersArr: Array<Locker> = [{_id: '', name: 'Select Locker'}];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
                private slotsService: SlotsService, private lockersService: LockersService) {
        this.isDataLoaded = false;
        this.slotObj = {lockerId: '', type: 'SMALL'};
        this.activatedRoute.params.subscribe(params => {
            this.slotId = params['id'];
        });
    }

    ngOnInit() {
        this.fnGetLockers();
    }

    /**
     * Get slot
     * @param {string} id
     * */
    fnGetSlot(id: string) {
        this.slotsService.fnGetSlot(id)
            .then((slotObj: Slot) => {
                this.isDataLoaded = false;
                this.slotObj = slotObj;
            });
    }

    /**
     * Get lockers
     * */
    fnGetLockers() {
        this.isDataLoaded = true;
        this.lockersService.fnGetLockers()
            .then((lockersArr: Array<Locker>) => {
                this.lockersArr = [];
                this.lockersArr = lockersArr;
                this.lockersArr.unshift({_id: '', name: 'Select Locker'});
                if (this.slotId !== 'add') {
                    this.fnGetSlot(this.slotId);
                } else {
                    this.isDataLoaded = false;
                }
            });
    }

    /**
     * Create/Update slot
     * @param {object} slotObj
     * */
    fnSaveSlot(slotObj: Slot) {
        if (slotObj._id) {
            this.slotsService.fnUpdateSlot(slotObj)
                .then(() => {
                    this.toastr.fnSuccess('Slot updated successfully.');
                    this.router.navigateByUrl('/slots');
                });
        } else {
            if (!slotObj.lockerId) {
                slotObj.lockerId = this.currentSlot.lockerId;
            }
            this.slotsService.fnCreateSlot(slotObj)
                .then(() => {
                    this.toastr.fnSuccess('Slot created successfully.');
                    this.router.navigateByUrl('/slots');
                });
        }
    }

}
