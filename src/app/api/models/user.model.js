import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
  },
  details: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  score: {
    level: {
      type: Number,
      default: 1,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  settings: {
    highContrast: {
      type: Boolean,
      default: false,
    },
  },
});

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
