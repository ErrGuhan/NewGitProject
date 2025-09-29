import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'processor', 'lab', 'consumer'], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
