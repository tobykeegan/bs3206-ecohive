import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

/**
 * Define a user for the MongoDB & perform the password hashing on save
 * @author Alec Painter
 */

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
      unique: [true, 'Account already exists'],
      validate: [validator.isEmail, 'Please enter a valid email'],
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
  password: {
    type: String,
    required: true,
    select: false,
  },
  security: {
    question: {
      type: String,
      required: true,
      select: false,
    },
    answer: {
      type: String,
      required: true,
      select: false,
    },
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  if (this.isModified('security.answer')) {
    this.security.answer = await bcrypt.hash(this.security.answer, 12);
  }
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.compareSecAnswers = async function (enteredAnswer) {
  return await bcrypt.compare(enteredAnswer, this.security.answer);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
