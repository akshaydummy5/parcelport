import * as _ from 'lodash';
import * as passport from 'passport';
import Auth from '../auth';

export default function fnLocal(req, res, next) {
    const auth = new Auth();
    passport.authenticate('local', function (err, user, info) {
        const error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({message: 'Something went wrong, please try again.'});
        }
        const token = auth.fnSignToken(user._id);
        const fullName = user.firstName + ' ' + user.lastName;
        const filterUser = _.pick(user, _.keys({
            _id: null,
            firstName: null,
            lastName: null,
            email: null,
            role: null,
            provider: null,
            companyId: null
        }));
        res.json({token: token, user: _.assign({}, filterUser, {fullName: fullName})});
    })(req, res, next);
}
