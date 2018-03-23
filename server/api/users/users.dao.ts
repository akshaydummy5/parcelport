import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import Users from './users.model';
import DAO from '../../services/dao';

dotenv.load({path: '.env'});

export default class UsersDAO extends DAO {
    model = Users;

    /**
     * Get list of users but skip -salt, -hashedPassword fields.
     * @param {object} req - request object.
     */
    fnGetUsers = (req) => {
        const fields = '-salt -hashedPassword';
        return new Promise((resolve, reject) => {
            this.model.find(req.query, fields)
                .populate('companyId')
                .then(users => {
                    resolve(users);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Get single user but skip -salt, -hashedPassword fields.
     * @param {object} req - request object.
     */
    fnGetUser = (req) => {
        const fields = '-salt -hashedPassword';
        return new Promise((resolve, reject) => {
            this.fnGet(req.params.id, fields)
                .then(user => {
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Create a new user.
     * @param {object} req - request object.
     */
    fnCreateUsers = (req) => {
        const _user = new Users(req.body);
        _user.provider = 'local';
        _user.code = 'D' + new Date().getTime().toString(32).toUpperCase();
        return new Promise((resolve, reject) => {
            this.fnInsert(_user)
                .then(user => {
                    resolve(user);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };

    /**
     * Sign up a new user.
     * @param {object} req - request object.
     */
    fnSignUp = (req) => {
        const _user = new Users(req.body);
        _user.provider = 'local';
        _user.code = 'D' + new Date().getTime().toString(32).toUpperCase();
        return new Promise((resolve, reject) => {
            this.fnInsert(_user)
                .then(obj => {
                    const token = jwt.sign({_id: obj['_id']}, process.env.SECRET_SESSION, {expiresIn: 60 * 5});
                    resolve({token: token});
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
}
