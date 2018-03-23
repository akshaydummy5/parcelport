import Packages from './packages.model';
import DAO from '../../services/dao';

export default class PackagesDAO extends DAO {
    model = Packages;
}
