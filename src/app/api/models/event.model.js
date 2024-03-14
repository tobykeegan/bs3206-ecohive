import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  type: String,
  location: String,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  attendance: {
    capacity: Number,
    signups: Number,
  },
  photoBase64: String,
  points: Number,
  tags: [
    {
      name: String,
      colour: String,
    },
  ],
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;
