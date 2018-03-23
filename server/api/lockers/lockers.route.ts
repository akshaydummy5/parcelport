import LockersController from './lockers.controller';
import Auth from '../../auth/auth';

export default function fnLockersRoutes(router) {

    const lockersCtrl = new LockersController();
    const auth = new Auth();

    router.route('/lockers')
        .get(auth.fnIsAuthenticated(), lockersCtrl.fnGetLockers)
        .post(auth.fnHasRole('ADMIN'), lockersCtrl.fnCreateLocker);
    router.route('/lockers/count').get(auth.fnIsAuthenticated(), lockersCtrl.fnCountLocker);
    router.route('/lockers/:id').get(auth.fnIsAuthenticated(), lockersCtrl.fnGetLocker);
    router.route('/lockers/:id').put(auth.fnHasRole('ADMIN'), lockersCtrl.fnUpdateLocker);
    router.route('/lockers/:id').delete(auth.fnHasRole('ADMIN'), lockersCtrl.fnDeleteLocker);
}
