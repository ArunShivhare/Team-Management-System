const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['new', 'accepted', 'completed', 'failed'], default: 'new' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: String },
    taskDate: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
