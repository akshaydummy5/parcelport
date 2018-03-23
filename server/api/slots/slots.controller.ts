import SlotsDAO from './slots.dao';
const slotsDAO = new SlotsDAO();

export default class SlotsController {

    /**
     * Get list of slots.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetSlots = (req, res) => {
        slotsDAO
            .fnGetSlots(req)
            .then(slot => res.status(200).json(slot))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Get a slot.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetSlot = (req, res) => {
        slotsDAO
            .fnGet(req.params.id)
            .then(slot => res.status(200).json(slot))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Create a new slot.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateSlot = (req, res) => {
        slotsDAO
            .fnCreateSlot(req)
            .then(slot => res.status(201).json(slot))
            .catch(error => res.status(422).json(error));
    };

    /**
     * Update existing slot.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateSlot = (req, res) => {
        slotsDAO
            .fnUpdate(req.params.id, req.body)
            .then(slot => res.status(200).json(slot))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Remove slot.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteSlot = (req, res) => {
        slotsDAO
            .fnDeleteSlot(req.params.id)
            .then(slot => res.status(204).json(slot))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Total slots.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCountSlot = (req, res) => {
        slotsDAO
            .fnCount()
            .then(count => res.status(304).json(count))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Allocate existing slot.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnAllocateSlot = (req, res) => {
        slotsDAO
            .fnAllocateSlot(req, 'UNAVAILABLE')
            .then(slot => res.status(200).json(slot))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Release existing slot.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnReleaseSlot = (req, res) => {
        slotsDAO
            .fnReleaseSlot(req.params.id, 'AVAILABLE')
            .then(slot => res.status(200).json(slot))
            .catch(error => res.status(400).json(error));
    };
}
