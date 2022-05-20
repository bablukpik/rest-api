const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../util/auth');

// authentication middleware
module.exports = (req, res, next) => {
  try {
    // Option 1
    const token = req.headers.authorization?.split(' ')[1] || ''; // Bearer Token

    // Option 2
    // const token = req.header('x-auth-token');

    if (!token) {
      // token not found
      return res.status(401).json({
        error: 'Authorization failed',
      });
    }
    const jwtData = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.auth = jwtData;
    return next();
  } catch {
    // token found but the token is no longer valid
    return res.status(403).json({
      error: 'Access denied',
    });
  }
};