import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationsSchema = new Schema({
    name: String,
    geoId: String,
    placeId: String,
    streetNumber: String,
    route: String,
    city: String,
    state: String,
    stateCode: String,
    country: String,
    countryCode: String,
    postalCode: String,
    formattedAddress: String,
    latitude: Number,
    longitude: Number
});

const Locations = mongoose.model('Locations', locationsSchema);
export default Locations;
