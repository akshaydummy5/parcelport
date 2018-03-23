import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const slotsSchema = new Schema({
    lockerId: {type: Schema.Types.ObjectId, ref: 'Lockers'},
    packageId: {type: Schema.Types.ObjectId, ref: 'Packages'},
    type: String,
    slotNumber: Number,
    status: {type: String, default: 'AVAILABLE'},
    totalShipped: {type: Number, default: 0},
    totalReceived: {type: Number, default: 0},
    repairs: {type: Number, default: 0}
});

const Slots = mongoose.model('Slots', slotsSchema);
export default Slots;
