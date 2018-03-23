import SlotsController from './slots.controller';
import Auth from '../../auth/auth';

export default function fnSlotsRoutes(router) {

    const slotsCtrl = new SlotsController();
    const auth = new Auth();

    router.route('/slots')
        .get(auth.fnIsAuthenticated(), slotsCtrl.fnGetSlots)
        .post(auth.fnHasRole('ADMIN'), slotsCtrl.fnCreateSlot);
    router.route('/slots/count').get(auth.fnIsAuthenticated(), slotsCtrl.fnCountSlot);
    router.route('/slots/:id').get(auth.fnIsAuthenticated(), slotsCtrl.fnGetSlot);
    router.route('/slots/:id').put(auth.fnHasRole('ADMIN'), slotsCtrl.fnUpdateSlot);
    router.route('/slots/:id').delete(auth.fnHasRole('ADMIN'), slotsCtrl.fnDeleteSlot);
    router.route('/slots/:id/allocate').put(auth.fnIsAuthenticated(), slotsCtrl.fnAllocateSlot);
    router.route('/slots/:id/release').put(auth.fnIsAuthenticated(), slotsCtrl.fnReleaseSlot);
}
