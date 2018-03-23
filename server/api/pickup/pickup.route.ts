import PickupController from './pickup.controller';

export default function fnPickupRoutes(router) {

    const pickupCtrl = new PickupController();

    router.route('/pickup/scan-code').post(pickupCtrl.fnScanCode);

}
