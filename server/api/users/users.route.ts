import UsersController from './users.controller';
import Auth from '../../auth/auth';

export default function fnUsersRoutes(router) {

    const usersCtrl = new UsersController();
    const auth = new Auth();

    router.route('/users')
        .get(auth.fnHasRole('ADMIN' || 'COMPANY'), usersCtrl.fnGetUsers)
        .post(auth.fnHasRole('ADMIN' || 'COMPANY'), usersCtrl.fnCreateUsers);
    router.route('/sign-up')
        .post(usersCtrl.fnSignUp);
    router.route('/users/count')
        .get(auth.fnHasRole('ADMIN' || 'COMPANY'), usersCtrl.fnCountUser);
    router.route('/users/:id')
        .get(auth.fnHasRole('ADMIN' || 'COMPANY'), usersCtrl.fnGetUser)
        .put(auth.fnHasRole('ADMIN' || 'COMPANY'), usersCtrl.fnUpdateUser)
        .delete(auth.fnHasRole('ADMIN' || 'COMPANY'), usersCtrl.fnDeleteUser);

}
