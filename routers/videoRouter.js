const express = require('express');
const router = express.Router();
const videoController = require("../controllers/videoController")

// Define routes
router.post('/', videoController.createVideo);
router.get('/', videoController.getVideoUrl);

module.exports = router;