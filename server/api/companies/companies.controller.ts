import CompaniesDAO from './companies.dao';
const companiesDAO = new CompaniesDAO();

export default class CompaniesController {

    /**
     * Get list of companies.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetCompanies = (req, res) => {
        companiesDAO
            .fnGetAll()
            .then(company => res.status(200).json(company))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Get a company.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnGetCompany = (req, res) => {
        companiesDAO
            .fnGet(req.params.id)
            .then(company => res.status(200).json(company))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Create a new company.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCreateCompany = (req, res) => {
        companiesDAO
            .fnCreateCompany(req)
            .then(company => res.status(201).json(company))
            .catch(error => res.status(422).json(error));
    };

    /**
     * Update existing company.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnUpdateCompany = (req, res) => {
        companiesDAO
            .fnUpdate(req.params.id, req.body)
            .then(company => res.status(200).json(company))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Remove company.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnDeleteCompany = (req, res) => {
        companiesDAO
            .fnDelete(req.params.id)
            .then(company => res.status(204).json(company))
            .catch(error => res.status(400).json(error));
    };

    /**
     * Total companies.
     * @param {object} req - request object.
     * @param {object} res - response object.
     */
    fnCountCompany = (req, res) => {
        companiesDAO
            .fnCount()
            .then(count => res.status(304).json(count))
            .catch(error => res.status(400).json(error));
    };
}
