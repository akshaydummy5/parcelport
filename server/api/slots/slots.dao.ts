import DAO from '../../services/dao';
import Slots from './slots.model';
import Counter from '../../models/counter.model';
import Lockers from '../lockers/lockers.model';
import Packages from '../packages/packages.model';
import EMAIL from '../../services/email';
import SMS from '../../services/sms';
const EmailService = new EMAIL();
const SMSService = new SMS();

export default class SlotsDAO extends DAO {
    model = Slots;
    counterModel = Counter;
    lockersModel = Lockers;
    packagesModel = Packages;

    /**
     * Get list of slots.
     * @param {object} req - request object.
     */
    fnGetSlots = (req) => {
        const fields = '';
        return new Promise((resolve, reject) => {
            this.model.find(req.query, fields)
                .populate('lockerId')
                .then(lockers => {
                    resolve(lockers);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Create a new slot.
     * @param {object} req - request object.
     */
    fnCreateSlot = (req) => {
        return new Promise((resolve, reject) => {
            this.counterModel.findByIdAndUpdate(
                {_id: 'entityId'},
                {$inc: {slotNumber: 1}},
                {'upsert': true, 'new': true},
                (error, counter) => {
                    if (error) {
                        reject(error);
                    }
                    const _slot = new Slots(req.body);
                    _slot.slotNumber = counter.slotNumber;
                    this.fnInsert(_slot)
                        .then((slot) => {
                            this.lockersModel.findById({_id: slot['lockerId']}, (_err, lockerObj) => {
                                if (_err) {
                                    reject(_err);
                                } else {
                                    lockerObj.availableSlots++;
                                    lockerObj.totalSlots++;

                                    this.lockersModel.findOneAndUpdate({_id: lockerObj._id}, lockerObj, {new: true}, (err) => {
                                        if (err) {
                                            reject(err);
                                        }
                                        resolve(slot);
                                    });
                                }
                            });
                        })
                        .catch(_error => reject(_error));
                });
        });
    };

    /**
     * Delete slot.
     * @param {string} id.
     */
    fnDeleteSlot = (id) => {
        return new Promise((resolve, reject) => {
            this.model.findById({_id: id}, (err, slotObj) => {
                if (err) {
                    reject(err);
                }
                this.fnDelete(id)
                    .then((slot) => {
                        this.lockersModel.findById({_id: slotObj['lockerId']}, (_err, lockerObj) => {
                            if (_err) {
                                reject(_err);
                            } else {
                                lockerObj.availableSlots--;
                                lockerObj.totalSlots--;

                                this.lockersModel.findOneAndUpdate({_id: lockerObj._id}, lockerObj, {new: true}, (error) => {
                                    if (error) {
                                        reject(error);
                                    }
                                    resolve(slot);
                                });
                            }
                        });
                    })
                    .catch(_error => reject(_error));
            });
        });
    };

    /**
     * Allocate and Release a new slot.
     * @param {object} req - request object.
     * @param {string} status.
     */
    fnAllocateSlot = (req, status?: string) => {
        const id = req.params.id;
        const packageId = req.body.packageId;
        const updateObj = {
            status: status,
            packageId: packageId
        };
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({_id: id}, updateObj, {new: true}, (err, obj) => {
                if (err) {
                    reject(err);
                }
                const pickUpCode = 'P' + new Date().getTime().toString(36).toUpperCase();
                this.packagesModel.findOneAndUpdate({_id: packageId}, {'pickupCode': pickUpCode, 'status': 'Stored'},
                    {new: true})
                    .populate('shipmentId')
                    .exec((packageErr, packageObj) => {
                        if (packageErr) {
                            reject(packageErr);
                        } else {
                            this.lockersModel.findById({_id: obj.lockerId}).exec((_err, lockerObj) => {
                                if (_err) {
                                    reject(_err);
                                }
                                if (status === 'UNAVAILABLE') {
                                    lockerObj.availableSlots--;
                                } else {
                                    lockerObj.availableSlots++;
                                }

                                this.lockersModel.findOneAndUpdate({_id: lockerObj._id}, lockerObj, {new: true})
                                    .exec((error) => {
                                        if (error) {
                                            reject(error);
                                        }
                                        const resObj = {
                                            'slot': obj,
                                            'package': packageObj
                                        };
                                        const notifyObj = {
                                            code: packageObj.pickupCode,
                                            email: packageObj.shipmentId.receiver.email,
                                            phone: packageObj.shipmentId.receiver.phone,
                                            packages: [packageObj]
                                        };
                                        EmailService.fnSendEmail('pickup', notifyObj);
                                        SMSService.fnSendSMS('pickup', notifyObj);
                                        resolve(resObj);
                                    });
                            });
                        }
                    });
            });
        });
    };

    /**
     * Release and Release a new slot.
     * @param {object} slot - request object.
     * @param {string} status.
     */
    fnReleaseSlot = (slot, status?: string) => {
        const id = slot._id;
        const updateObj = {
            status: status,
            $unset: {packageId: 1}
        };
        return new Promise((resolve, reject) => {
            this.model.findOneAndUpdate({_id: id}, updateObj, {new: true}, (err, slotObj) => {
                if (err) {
                    reject(err);
                } else {
                    this.lockersModel.findById({_id: slotObj.lockerId}, (_err, lockerObj) => {
                        if (_err) {
                            reject(_err);
                        } else {
                            if (status === 'UNAVAILABLE') {
                                lockerObj.availableSlots--;
                            } else {
                                lockerObj.availableSlots++;
                            }

                            this.lockersModel.findOneAndUpdate(
                                {_id: lockerObj._id},
                                lockerObj,
                                {new: true},
                                (error) => {
                                    if (error) {
                                        reject(error);
                                    }
                                    resolve(slotObj);
                                });
                        }
                    });
                }
            });
        });
    };

}
