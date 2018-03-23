import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import Users from '../users/users.model';
import Packages from '../packages/packages.model';
import Slot from '../slots/slots.model';

dotenv.load({path: '.env'});

export default class DropOffDAO {
    userModel = Users;
    packagesModel = Packages;
    slotModel = Slot;

    /**
     * Scan drop off code.
     * @param {object} req - request object.
     */
    fnScanCode = (req) => {
        const code = req.body.code;
        return new Promise((resolve, reject) => {
            this.userModel.find({code: code})
                .exec((err, arr) => {
                    const user = arr[0];
                    if (err) {
                        reject(err);
                    } else {
                        if (user) {
                            const token = jwt.sign({_id: user['_id']}, process.env.SECRET_SESSION, {expiresIn: 60 * 5});
                            resolve({token: token});
                        } else {
                            reject({message: 'Drop off code not found.'});
                        }
                    }
                });
        });
    };

    /**
     * Scan drop off label.
     * @param {object} req - request object.
     */
    fnScanLabel = (req) => {
        const code = req.body.code;
        return new Promise((resolve, reject) => {
            this.packagesModel.find({label: code})
                .exec((err, arr) => {
                    const packageObj = arr[0];
                    if (err) {
                        reject(err);
                    } else {
                        if (packageObj) {
                            this.slotModel.find({type: packageObj.size, status: 'AVAILABLE'})
                                .exec((_err, _arr) => {
                                    const slot = _arr[0];
                                    if (_err) {
                                        reject(_err);
                                    } else {
                                        if (slot) {
                                            resolve({'slot': slot, 'package': packageObj});
                                        } else {
                                            reject({message: 'Slot not available.'});
                                        }
                                    }
                                });
                        } else {
                            reject({message: 'Scanned label not found.'});
                        }
                    }
                });
        });
    }
}
