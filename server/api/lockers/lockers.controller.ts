import LockersDAO from './lockers.dao';
const lockersDAO = new LockersDAO();

export default class LockersController {

    /**
     * Get list of lockers.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetLockers = (req, res) => {
        lockersDAO
            .fnGetLockers(req)
            .then(locker => res.status(200).json(locker))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Get a locker.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetLocker = (req, res) => {
        lockersDAO
            .fnGet(req.params.id)
            .then(locker => res.status(200).json(locker))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Create a new locker.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateLocker = (req, res) => {
        lockersDAO
            .fnCreateLocker(req)
            .then(locker => res.status(201).json(locker))
            .catch(error => res.status(422).json(error));
    };

    /**
     * Update existing locker.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateLocker = (req, res) => {
        lockersDAO
            .fnUpdate(req.params.id, req.body)
            .then(locker => res.status(200).json(locker))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Remove locker.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteLocker = (req, res) => {
        lockersDAO
            .fnDelete(req.params.id)
            .then(locker => res.status(204).json(locker))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Total lockers.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCountLocker = (req, res) => {
        lockersDAO
            .fnCount()
            .then(count => res.status(304).json(count))
            .catch(error => res.status(400).json(error));
    };
}
