// controllers/commentController.js
// const Comment = require('../models/Comment');
const Comment = require("../models/comments")
exports.createComment = async (req, res) => {
  try {
    const { postId, userId, text,name,picture,department } = req.body;
    const comment = await Comment.create({ postId, userId, text,name,picture,department });
    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalCommentNumber = async (req, res) => {
  try {
    const postId = req.params.postId;
    const totalComments = await Comment.countDocuments({ postId });
    res.status(200).json({ totalComments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.likeComment = async (req, res) => {
//     try {
//       const { commentId } = req.params;
//       const { userId } = req.body;
  
//       const comment = await Comment.findById(commentId);
  
//       if (!comment) {
//         return res.status(404).json({ message: 'Comment not found' });
//       }
  
//       const index = comment.likes.indexOf(userId);
//       if (index === -1) {
//         // User has not liked the comment yet, add like
//         comment.likes.push(userId);
//       } else {
//         // User has already liked the comment, remove like
//         comment.likes.splice(index, 1);
//       }
  
//       await comment.save();
  
//       res.status(200).json({ message: 'Like updated successfully', likes: comment.likes.length });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  