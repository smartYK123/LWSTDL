// const Video = require('../models/video');
// const TrainingRequest = require("../models/training");
const { Video } = require("../models/player")
// Create a new video
// exports.createVideo = async (req, res) => {
//   try {
//     const { videoUrl,title } = req.body;
//     const newVideo = new Video({ videoUrl,title });
//     await newVideo.save();
//     res.status(201).json(newVideo);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Controller function to handle creating a new video
exports.createVideo = async (req, res) => {
  try {
    const { videoUrl, title, description } = req.body;

    // Create a new video document
    const newVideo = await Video.create({
      videoUrl,
      title,
      description,
    });

    res.status(201).json({
      status: 'success',
      data: {
        video: newVideo,
      },
    });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

// exports.getVideoUrl = async (req, res) => {
//     try {
//       const video = await Video.findOne();
//       if (!video) {
//         return res.status(404).json({ message: 'Video not found' });
//       }
//       res.status(200).json({ videoUrl: video.videoUrl });
//     } catch (error) {
//       console.error('Error fetching video URL:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
exports.getVideoUrl = async (req, res) => {
  try {
    const videos = await Video.find(); // Retrieve all fields for all documents
    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: 'No videos found' });
    }
    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

