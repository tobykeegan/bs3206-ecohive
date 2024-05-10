import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Define a badge for MongoDB
 * @author Jade Carino
 */

const BadgeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  criteria: {
    serializedFunction: {
      type: String,
      required: true,
    },
  },
});

const Badge = mongoose.models?.Badge || mongoose.model('Badge', BadgeSchema);

export default Badge;
