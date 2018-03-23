import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packagesSchema = new Schema({
    label: String,
    packageType: String,
    weight: String,
    size: String,
    status: String,
    dateSent: Date,
    dateReceived: Date,
    shipmentId: {type: Schema.Types.ObjectId, ref: 'Shipments'},
    pickupCode: String
});

const Packages = mongoose.model('Packages', packagesSchema);
export default Packages;
