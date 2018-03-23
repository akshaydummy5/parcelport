import ShipmentsController from './shipments.controller';
import Auth from '../../auth/auth';

export default function fnShipmentsRoutes(router) {

    const shipmentsCtrl = new ShipmentsController();
    const auth = new Auth();

    router.route('/shipments')
        .get(auth.fnIsAuthenticated(), shipmentsCtrl.fnGetShipments)
        .post(auth.fnIsAuthenticated(), shipmentsCtrl.fnCreateShipment);
    router.route('/shipments/count').get(auth.fnIsAuthenticated(), shipmentsCtrl.fnCountShipment);
    router.route('/shipments/:id').get(auth.fnIsAuthenticated(), shipmentsCtrl.fnGetShipment);
    router.route('/shipments/:id').put(auth.fnIsAuthenticated(), shipmentsCtrl.fnUpdateShipment);
    router.route('/shipments/:id').delete(auth.fnIsAuthenticated(), shipmentsCtrl.fnDeleteShipment);

}
