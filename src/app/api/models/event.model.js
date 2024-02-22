import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    type: String,
    location: String,
    description: String,
    attendance: {
        capacity: Number,
        signups: Number
    },
    photoUrl: String,
    points: Number,
    tags: [{
        name: String,
        colour: String
    }],

});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;