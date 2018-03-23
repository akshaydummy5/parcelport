import CompaniesController from './companies.controller';
import Auth from '../../auth/auth';

export default function fnCompaniesRoutes(router) {

    const companiesCtrl = new CompaniesController();
    const auth = new Auth();

    router.route('/companies')
        .get(auth.fnHasRole('ADMIN'), companiesCtrl.fnGetCompanies)
        .post(auth.fnHasRole('ADMIN'), companiesCtrl.fnCreateCompany);
    router.route('/companies/:id')
        .get(auth.fnHasRole('ADMIN'), companiesCtrl.fnGetCompany)
        .put(auth.fnHasRole('ADMIN'), companiesCtrl.fnUpdateCompany)
        .delete(auth.fnHasRole('ADMIN'), companiesCtrl.fnDeleteCompany);
    router.route('/companies/count')
        .get(auth.fnHasRole('ADMIN'), companiesCtrl.fnCountCompany);

}
