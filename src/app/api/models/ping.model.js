import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PingSchema = new Schema({
  timestamp: Date,
  ip: String,
});

const Ping = mongoose.models.pings || mongoose.model('Ping', PingSchema);

export default Ping;
