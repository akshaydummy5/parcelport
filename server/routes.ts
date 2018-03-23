import * as express from 'express';
import * as path from 'path';

import fnAuthRoutes from './auth/auth.route';
import fnCompaniesRoutes from './api/companies/companies.route';
import fnUsersRoutes from './api/users/users.route';
import fnDropOffRoutes from './api/drop-off/drop.off.route';
import fnPickupRoutes from './api/pickup/pickup.route';
import fnShipmentsRoutes from './api/shipments/shipments.route';
import fnLocationsRoutes from './api/locations/locations.route';
import fnLockersRoutes from './api/lockers/lockers.route';
import fnSlotsRoutes from './api/slots/slots.route';

export default function fnSetRoutes(app) {

    const router = express.Router();

    fnAuthRoutes(router);
    fnCompaniesRoutes(router);
    fnUsersRoutes(router);
    fnDropOffRoutes(router);
    fnPickupRoutes(router);
    fnShipmentsRoutes(router);
    fnLocationsRoutes(router);
    fnLockersRoutes(router);
    fnSlotsRoutes(router);

    // Apply the routes to our application with the prefix /api
    app.use('/api', router);

    // All undefined asset or api routes should return a 404
    app.use((req, res) => {
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', {url: req.url});
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({error: 'Not found'});
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });

    // All other routes should redirect to the index.html
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}
