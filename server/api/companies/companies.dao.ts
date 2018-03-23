import * as _ from 'lodash';

import Companies from './companies.model';
import DAO from '../../services/dao';
import UsersDAO from '../users/users.dao';
const usersDAO = new UsersDAO();

export default class CompaniesDAO extends DAO {
    model = Companies;

    /**
     * Create a new company.
     * @param {object} req - request object.
     */
    fnCreateCompany = (req) => {
        const _company = new Companies(req.body);
        return new Promise((resolve, reject) => {
            this.fnInsert(_company)
                .then(company => {
                    const _user = _.assign({}, req.body, {companyId: company['_id'], role: 'COMPANY'});
                    usersDAO
                        .fnCreateUsers({body: _user})
                        .then(user => resolve(company))
                        .catch(error => reject(error));
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

}
