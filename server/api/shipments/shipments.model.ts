import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shipmentsSchema = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: 'Users'},
    receiver: {
        firstName: String,
        lastName: String,
        name: String,
        email: String,
        phone: String,
        address1: String,
        address2: String,
        postalCode: String,
        city: String,
        state: String,
        country: String,
    },
    receiverPhone: String,
    receiverEmail: String,
    locationId: {type: Schema.Types.ObjectId, ref: 'Locations'},
    userId: {type: Schema.Types.ObjectId, ref: 'Users'},
    companyId: {type: Schema.Types.ObjectId, ref: 'Companies'},
    packages: [{type: Schema.Types.ObjectId, ref: 'Packages'}]
});

const Shipments = mongoose.model('Shipments', shipmentsSchema);
export default Shipments;
