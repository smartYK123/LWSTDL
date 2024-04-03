// controllers/trainingRequestController.js
const TrainingRequest = require("../models/training");
const secretKey = require("../secret")
const jwt = require("jsonwebtoken");

exports.submitRequest = async (req, res) => {
    try {
      const { name, course, area,userId } = req.body;
      // const token = req.headers.authorization;
  
      // if (!token) {
      //   return res.status(401).json({ message: "Token is missing" });
      // }
  
      // // Verify the token
      // const decoded = jwt.verify(token.split(" ")[1], secretKey);
  
      // // Extract userId from the decoded token
      // const userId = decoded.userId;
  
      // Create new training request with submittedBy field set to userId
      const newRequest = new TrainingRequest({
        name,
        course,
        area,
        submittedBy: userId,
      });
  
      // Save the new request to the database
      await newRequest.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Training request submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  