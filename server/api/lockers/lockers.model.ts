import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const lockersSchema = new Schema({
    name: String,
    locationId: {type: Schema.Types.ObjectId, ref: 'Locations'},
    totalSlots: {type: Number, default: 0},
    availableSlots: {type: Number, default: 0}
});

const Lockers = mongoose.model('Lockers', lockersSchema);
export default Lockers;
