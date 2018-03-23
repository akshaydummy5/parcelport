import ShipmentsDAO from './shipments.dao';
const shipmentsDAO = new ShipmentsDAO();

export default class ShipmentsController {

    /**
     * Get list of shipments.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetShipments = (req, res) => {
        shipmentsDAO
            .fnGetShipments(req)
            .then(shipment => res.status(200).json(shipment))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Get a shipment.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetShipment = (req, res) => {
        shipmentsDAO
            .fnGet(req.params.id)
            .then(shipment => res.status(200).json(shipment))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Create a new shipment.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateShipment = (req, res) => {
        shipmentsDAO
            .fnCreateShipment(req)
            .then(shipment => res.status(201).json(shipment))
            .catch(error => res.status(422).json(error));
    };

    /**
     * Update existing shipment.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateShipment = (req, res) => {
        shipmentsDAO
            .fnUpdate(req.params.id, req.body)
            .then(shipment => res.status(200).json(shipment))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Remove shipment.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteShipment = (req, res) => {
        shipmentsDAO
            .fnDeleteShipment(req)
            .then(shipment => res.status(204).json(shipment))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Total shipments.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCountShipment = (req, res) => {
        shipmentsDAO
            .fnCount()
            .then(count => res.status(304).json(count))
            .catch(error => res.status(400).json(error));
    };
}
