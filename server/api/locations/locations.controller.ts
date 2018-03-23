import LocationsDAO from './locations.dao';
const locationsDAO = new LocationsDAO();

export default class LocationsController {

    /**
     * Get list of locations.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetLocations = (req, res) => {
        locationsDAO
            .fnGetAll()
            .then(location => res.status(200).json(location))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Get a location.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetLocation = (req, res) => {
        locationsDAO
            .fnGet(req.params.id)
            .then(location => res.status(200).json(location))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Create a new location.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateLocation = (req, res) => {
        locationsDAO
            .fnCreateLocation(req.body)
            .then(location => res.status(201).json(location))
            .catch(error => res.status(422).json(error));
    };

    /**
     * Update existing location.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateLocation = (req, res) => {
        locationsDAO
            .fnUpdate(req.params.id, req.body)
            .then(location => res.status(200).json(location))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Remove location.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteLocation = (req, res) => {
        locationsDAO
            .fnDelete(req.params.id)
            .then(location => res.status(204).json(location))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Total locations.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCountLocation = (req, res) => {
        locationsDAO
            .fnCount()
            .then(count => res.status(304).json(count))
            .catch(error => res.status(400).json(error));
    };
}
