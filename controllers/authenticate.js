const jwt = require('jsonwebtoken');
// const secretKey = require("../secret")
const secretKey = require("../secret")
// Middleware function to validate token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
  
    jwt.verify(token.split(' ')[1], secretKey, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      req.userId = decodedToken.userId; // Attach user ID to request object
    });
  };
  module.authenticateToken = authenticateToken;