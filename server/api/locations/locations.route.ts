import LocationsController from './locations.controller';
import Auth from '../../auth/auth';

export default function fnLocationsRoutes(router) {

    const locationsCtrl = new LocationsController();
    const auth = new Auth();

    router.route('/locations')
        .get(auth.fnIsAuthenticated(), locationsCtrl.fnGetLocations)
        .post(auth.fnIsAuthenticated(), locationsCtrl.fnCreateLocation);
    router.route('/locations/count').get(auth.fnIsAuthenticated(), locationsCtrl.fnCountLocation);
    router.route('/locations/:id').get(auth.fnIsAuthenticated(), locationsCtrl.fnGetLocation);
    router.route('/locations/:id').put(auth.fnIsAuthenticated(), locationsCtrl.fnUpdateLocation);
    router.route('/locations/:id').delete(auth.fnIsAuthenticated(), locationsCtrl.fnDeleteLocation);
}
