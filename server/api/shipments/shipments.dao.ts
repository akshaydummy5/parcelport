import * as _ from 'lodash';

import Shipments from './shipments.model';
import Users from '../users/users.model';
import Packages from '../packages/packages.model';
import DAO from '../../services/dao';
import PackagesDAO from '../packages/packages.dao';
import EMAIL from '../../services/email';
import SMS from '../../services/sms';
const EmailService = new EMAIL();
const SMSService = new SMS();
const packagesDAO = new PackagesDAO();

export default class ShipmentsDAO extends DAO {
    model = Shipments;
    usersModel = Users;
    packagesModel = Packages;

    /**
     * Create a new shipment.
     * @param {object} req - request object.
     */
    fnCreateShipment = (req) => {
        const _shipment = new Shipments(req.body);
        return new Promise((resolve, reject) => {
            this.fnInsert(_shipment)
                .then(obj => {
                    const shipmentId = obj['_id'];
                    const packagesPromiseArr = [];
                    _.forEach(req.body.packages, (item) => {
                        const _package = new Packages(item);
                        _package.shipmentId = shipmentId;
                        packagesPromiseArr.push(packagesDAO.fnInsert(_package));
                    });
                    const results = Promise.all(packagesPromiseArr);
                    results.then(packages => {
                        this.model.findOneAndUpdate(
                            {_id: shipmentId},
                            {packages: packages.map((d) => d._id)},
                            {new: true},
                            (err, shipment) => {
                                if (err) {
                                    reject(err);
                                }
                                this.usersModel.findById({_id: shipment['sender']}, '')
                                    .exec((userErr, user) => {
                                        if (err) {
                                            reject(userErr);
                                        }
                                        const notifyObj = {
                                            code: user.code,
                                            email: user.email,
                                            phone: user.phone,
                                            packages: packages
                                        };
                                        EmailService.fnSendEmail('drop-off', notifyObj);
                                        SMSService.fnSendSMS('drop-off', notifyObj);
                                        resolve(shipment);
                                    });
                            });
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Get list of shipments.
     * @param {object} req - request object.
     */
    fnGetShipments = (req) => {
        const fields = '';
        return new Promise((resolve, reject) => {
            this.model.find(req.query, fields)
                .populate('sender', '-salt -hashedPassword')
                .populate('packages')
                .populate('companyId')
                .then(users => {
                    resolve(users);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Remove shipment.
     * @param {object} req - request object.
     */
    fnDeleteShipment = (req) => {
        return new Promise((resolve, reject) => {
            this.model
                .findOneAndRemove({_id: req.params.id})
                .then(shipment => {
                    this.packagesModel.find({shipmentId: req.params.id})
                        .remove()
                        .exec((err) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(shipment);
                        });
                })
                .catch(error => reject(error));
        });
    };

}
