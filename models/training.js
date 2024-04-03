// models/TrainingRequest.js
const mongoose = require('mongoose');

const trainingRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  area: { type: String, required: true },
  // submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Elite', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TrainingRequest', trainingRequestSchema);
