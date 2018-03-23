import DropOffDAO from './drop.off.dao';

const dropOffDAO = new DropOffDAO();


export default class DropOffController {

    /**
     * Scan drop off code.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnScanCode = (req, res) => {
        dropOffDAO
            .fnScanCode(req)
            .then(token => res.status(201).json(token))
            .catch(error => res.status(422).json(error));
    };

    /**
     * Scan drop off label.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnScanLabel = (req, res) => {
        dropOffDAO
            .fnScanLabel(req)
            .then(token => res.status(201).json(token))
            .catch(error => res.status(422).json(error));
    };

}
