import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['demonstration', 'meet-up', 'clean-up', 'education'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attendance: {
    capacity: Number,
    signups: Number,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: false,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;
