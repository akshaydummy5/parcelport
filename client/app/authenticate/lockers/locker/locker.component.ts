import {Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Locker} from '../locker';
import {LockersService} from '../lockers.service';
import {ToastrService} from '../../../common/toastr.service';

declare let google: any;
declare let self: any;

@Component({
    selector: 'pp-locker',
    templateUrl: './locker.component.html',
    styleUrls: ['./locker.component.css']
})

export class LockerComponent implements OnInit, AfterViewInit {

    @ViewChild('location') location: string;
    public isDataLoaded;
    public lockerObj: Locker;
    public lockerId: string;
    public autoComplete: any;
    public addressTypeArr = ['street_number', 'route', 'locality', 'administrative_area_level_1', 'country', 'postal_code'];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,
                private lockersService: LockersService, private chRef: ChangeDetectorRef) {
        this.isDataLoaded = false;
        this.lockerObj = {};
        this.activatedRoute.params.subscribe(params => {
            this.lockerId = params['id'];
        });
        self = this;
    }

    ngOnInit() {
        if (this.lockerId !== 'add') {
            this.fnGetLocker(this.lockerId);
        }
    }

    ngAfterViewInit() {
        this.fnInitGMAutoComplete();
    }

    fnInitGMAutoComplete() {
        this.autoComplete = new google.maps.places.Autocomplete(
            (document.getElementById('location')),
            {types: ['geocode']});
        google.maps.event.addListener(this.autoComplete, 'place_changed', this.fnFillInAddress);
    }

    fnFillInAddress() {
        // Get the place details from the auto complete object.
        const place = self.autoComplete.getPlace();
        self.lockerObj.formattedAddress = place.formatted_address;
        self.lockerObj.geoId = place.id;
        self.lockerObj.placeId = place.placeId;
        self.lockerObj.latitude = place.geometry.location.lat();
        self.lockerObj.longitude = place.geometry.location.lng();

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (let intIndex = 0; intIndex < place.address_components.length; intIndex++) {
            const addressType = place.address_components[intIndex].types[0];
            if (self.addressTypeArr.indexOf(addressType) > -1) {
                const val = place.address_components[intIndex];
                if (addressType === 'street_number') {
                    self.lockerObj.streetNumber = val.short_name;
                } else if (addressType === 'route') {
                    self.lockerObj.route = val.long_name;
                } else if (addressType === 'locality') {
                    self.lockerObj.city = val.long_name;
                } else if (addressType === 'administrative_area_level_1') {
                    self.lockerObj.state = val.long_name;
                    self.lockerObj.stateCode = val.short_name;
                } else if (addressType === 'country') {
                    self.lockerObj.country = val.long_name;
                    self.lockerObj.countryCode = val.short_name;
                } else if (addressType === 'postal_code') {
                    self.lockerObj.postalCode = val.short_name;
                }
            }
        }
        self.chRef.detectChanges();
    }

    /**
     * Get locker
     * @param {string} id
     * */
    fnGetLocker(id: string) {
        this.isDataLoaded = true;
        this.lockersService.fnGetLocker(id)
            .then((lockerObj: Locker) => {
                this.isDataLoaded = false;
                this.lockerObj = lockerObj;
            });
    }

    /**
     * Create/Update locker
     * @param {object} lockerObj
     * */
    fnSaveLocker(lockerObj: Locker) {
        if (lockerObj._id) {
            this.lockersService.fnUpdateLocker(lockerObj)
                .then(() => {
                    this.toastr.fnSuccess('Locker updated successfully.');
                    this.router.navigateByUrl('/lockers');
                });
        } else {
            this.lockersService.fnCreateLocker(lockerObj)
                .then(() => {
                    this.toastr.fnSuccess('Locker created successfully.');
                    this.router.navigateByUrl('/lockers');
                });
        }
    }

}
