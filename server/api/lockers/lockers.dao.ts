import Lockers from './lockers.model';
import DAO from '../../services/dao';
import LocationsDAO from '../locations/locations.dao';
const locationsDAO = new LocationsDAO();

export default class LockersDAO extends DAO {
    model = Lockers;

    /**
     * Get list of lockers.
     * @param {object} req - request object.
     */
    fnGetLockers = (req) => {
        const fields = '';
        return new Promise((resolve, reject) => {
            this.model.find(req.query, fields)
                .populate('locationId')
                .then(lockers => {
                    resolve(lockers);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Create a new locker.
     * @param {object} req - request object.
     */
    fnCreateLocker = (req) => {
        return new Promise((resolve, reject) => {
            locationsDAO.fnCreateLocation(req)
                .then(location => {
                    const _locker = new Lockers(req.body);
                    _locker.locationId = location['_id'];
                    this.fnInsert(_locker)
                        .then(locker => resolve(locker))
                        .catch(error => reject(error));
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

}
