import mongoose from 'mongoose';
import Event from './event.model';
import User from './user.model';

const Schema = mongoose.Schema;

/**
 * Track the attendance of a user at an event.
 * @author Toby Keegan
 */
const AttendanceSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: Event,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Attendance =
  mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);

export default Attendance;
