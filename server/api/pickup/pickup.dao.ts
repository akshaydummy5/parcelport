import Packages from '../packages/packages.model';
import Slots from '../slots/slots.model';
import SlotsDAO from '../slots/slots.dao';
const slotsDAO = new SlotsDAO();

export default class PickupDAO {
    packagesModel = Packages;
    slotModel = Slots;

    /**
     * Scan pickup code.
     * @param {object} req - request object.
     */
    fnScanCode = (req) => {
        const code = req.body.code;
        return new Promise((resolve, reject) => {
            const updateObj = {
                status: 'Delivered',
                $unset: {pickupCode: 1, label: 1}
            };
            this.packagesModel.findOneAndUpdate({pickupCode: code}, updateObj, {new: true}, (err, packageObj) => {
                if (err) {
                    reject(err);
                } else {
                    if (packageObj) {
                        this.slotModel.find({packageId: packageObj._id, status: 'UNAVAILABLE'})
                            .exec((_err, _arr) => {
                                const slot = _arr[0];
                                if (_err) {
                                    reject(_err);
                                } else {
                                    if (slot) {
                                        slotsDAO
                                            .fnReleaseSlot(slot, 'AVAILABLE')
                                            .then((_slot) => resolve({slot: _slot}))
                                            .catch(error => reject(error));
                                    } else {
                                        reject({message: 'Parcel not Available.'});
                                    }
                                }
                            });
                    } else {
                        reject({message: 'Pickup code not found.'});
                    }
                }
            });
        });
    }
}
