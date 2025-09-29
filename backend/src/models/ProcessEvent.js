import mongoose from 'mongoose';

const processEventSchema = new mongoose.Schema({
  processor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  step: String, // e.g., drying, grinding, packaging
  timestamp: { type: Date, default: Date.now },
  notes: String,
  imageUrl: String // optional, IPFS hash
});

export default mongoose.model('ProcessEvent', processEventSchema);
