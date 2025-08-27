import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' },
  startDate: Date,
  endDate: Date
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
