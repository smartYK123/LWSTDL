const { Comment } = require("../models/player")
exports.postComment = async (req, res) => {
    try {
      const { videoId, userId, text,name,picture,department } = req.body;
      const comment = new Comment({ videoId, userId, text,name,picture,department });
      await comment.save();
      res.json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.getTotalComments = async (req, res) => {
    try {
      const { videoId } = req.params;
      const totalComments = await Comment.countDocuments({ videoId });
      res.json({ totalComments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllComments = async (req, res) => {
    try {
      const { videoId } = req.params;
      const comments = await Comment.find({ videoId })
      res.json({ comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // .populate('userId', 'name'); // Assuming user model has a 'name' field