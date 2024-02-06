const mongoose = require('mongoose');

// Subschema for media
const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
});

// Main schema for trending content
const spiritSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  media: mediaSchema,
  description: {
    type: String,
    trim: true,
  },
});

// Define the model
const Spirit = mongoose.model('Spirit', spiritSchema);

module.exports = Spirit;
