import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const companiesSchema = new Schema({
    company: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
});

const Companies = mongoose.model('Companies', companiesSchema);
export default Companies;
