import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
