// routes/commentRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createPost } = require("../controllers/post");
const router = require("express").Router();
// const commentController = require('../controllers/commentController');
const commentController = require("../controllers/commentController")
router.post('/', commentController.createComment);
router.get('/:postId', commentController.getCommentsByPostId);
router.get("/total/:postId", commentController.getTotalCommentNumber);

module.exports = router;
