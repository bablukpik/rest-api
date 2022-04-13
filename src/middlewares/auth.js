const jwt = require('jsonwebtoken');
require('dotenv').config();

// authentication middleware
module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      // if (!token) return res.status(403).send("Access denied!");
      if (!token) return res.status(403).json({
            error: new Error('Access denied!')
          });
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.auth = decodedToken;
      next();
  } catch (error) {
      // res.status(401).send("Authorization failure!");
      res.status(401).json({
        error: new Error('Authorization failure!')
      });
  }
};
