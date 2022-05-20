const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';

decodeDataFromToken = (token, secret) => {
  return jwt.verify(token, secret, { ignoreExpiration: true });
}

const clearUserRefreshTokens = (refreshToken, refreshTokens = []) => {
  const { userId } = decodeDataFromToken(refreshToken, REFRESH_TOKEN_SECRET);
  return refreshTokens.filter((rtoken) => {
    const { userId: savedUserId } = decodeDataFromToken(rtoken, REFRESH_TOKEN_SECRET);
    return savedUserId !== userId;
  });
}

module.exports = {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  decodeDataFromToken,
  clearUserRefreshTokens
}
