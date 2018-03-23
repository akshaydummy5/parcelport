import Locations from './locations.model';
import DAO from '../../services/dao';

export default class LocationsDAO extends DAO {
    model = Locations;

    /**
     * Create a new location from Google Place API Auto complete.
     * @param {object} req - request object.
     */
    fnCreateLocation = (req) => {
        const _location = new Locations(req.body);
        return new Promise((resolve, reject) => {
            this.model.findOne({
                'geoId': _location.geoId,
                'placeId': _location.placeId
            }).exec((err, loc) => {
                if (err) {
                    reject(err);
                }
                if (!loc) {
                    this.fnInsert(_location)
                        .then(location => resolve(location))
                        .catch(error => reject(error));
                } else {
                    resolve(loc);
                }
            });
        });
    };
}
