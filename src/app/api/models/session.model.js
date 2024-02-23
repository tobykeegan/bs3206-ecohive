import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

const Session =
  mongoose.models.Session || mongoose.model('Session', SessionSchema);

export default Session;
