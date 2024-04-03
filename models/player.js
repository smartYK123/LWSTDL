const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
});

const Video = mongoose.model('Video', videoSchema);


// Like Model
const likeSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Elite',
    required: true
  }
});

const Like = mongoose.model('HomeLike', likeSchema);

// Comment Model
const commentSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Elite',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  picture: {
    uri: String,
  },
  department: {
    type: String
  },
  createdAt: { type: Date, default: Date.now },

});

const Comment = mongoose.model('homeComment', commentSchema);

module.exports = { Video, Like, Comment };
