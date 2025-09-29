import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: String, // URL or IPFS hash
  location: {
    lat: Number,
    lng: Number
  },
  harvestDate: Date,
  harvestMethod: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Crop', cropSchema);
