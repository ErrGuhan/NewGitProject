import mongoose from 'mongoose';

const labEventSchema = new mongoose.Schema({
  lab: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  result: String, // e.g., purity, chemical analysis
  certified: Boolean,
  certSignature: String, // digital signature (optional)
  reportUrl: String, // IPFS hash for report
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('LabEvent', labEventSchema);
