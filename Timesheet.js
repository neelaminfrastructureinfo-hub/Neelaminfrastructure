import mongoose from 'mongoose';

const timesheetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true, min: 0 },
  task: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
}, { timestamps: true });

export default mongoose.model('Timesheet', timesheetSchema);
