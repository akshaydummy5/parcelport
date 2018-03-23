import PickupDAO from './pickup.dao';
const pickupDAO = new PickupDAO();

export default class PickupController {

    /**
     * Scan pickup code.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnScanCode = (req, res) => {
        pickupDAO
            .fnScanCode(req)
            .then(token => res.status(201).json(token))
            .catch(error => res.status(422).json(error));
    };

}
