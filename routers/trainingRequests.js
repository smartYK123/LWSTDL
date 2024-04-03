// routes/trainingRequests.js
const express = require('express');
const router = express.Router();
const trainingRequestController = require("../controllers/trainingRequestController");

// POST /training-requests
router.post('/', trainingRequestController.submitRequest);

module.exports = router;
