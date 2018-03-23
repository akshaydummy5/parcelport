import DropOffController from './drop.off.controller';
import Auth from '../../auth/auth';

export default function fnDropOffRoutes(router) {

    const dropOffCtrl = new DropOffController();
    const auth = new Auth();

    router.route('/drop-off/scan-code').post(dropOffCtrl.fnScanCode);
    router.route('/drop-off/scan-label').post(auth.fnIsAuthenticated(), dropOffCtrl.fnScanLabel);

}
