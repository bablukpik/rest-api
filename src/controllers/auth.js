const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  ACCESS_TOKEN_SECRET,
  clearUserRefreshTokens,
  REFRESH_TOKEN_SECRET,
} = require('../util/auth');

let refreshTokens = [];
const ACCESS_TOKEN_EXPIRES_TIME = '2s';
const REFRESH_TOKEN_EXPIRES_TIME = '20s';

// Create a new user
exports.signup = (req, res) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(3).email().required(),
  });
  const { error: validationError } = validationSchema.validate({ email: req.body.email });

  if (validationError) {
    return res.status(400).json({
      error: validationError.details[0].message,
    });
  }

  bcrypt.hash(req?.body?.password, 10).then(
    (hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user.save().then(
        () => res.status(201).json({
          message: 'User added successfully!',
        }),
      ).catch(
        (error) => res.status(500).json({
          error,
        }),
      );
    },
  ).catch((error) => res.status(500).json({
    error,
  }));

  return true;
};

// Use it for authentication
exports.login = (req, res) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(3).email().required(),
  });
  const { error: validationError } = validationSchema.validate({ email: req.body.email });

  if (validationError) {
    return res.status(400).json({
      error: validationError.details[0].message,
    });
  }

  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: 'User not found',
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: 'Incorrect password',
            });
          }
          
          // Create an access token
          const accessToken = jwt.sign(
            { userId: user._id },
            ACCESS_TOKEN_SECRET,
            {
              expiresIn: ACCESS_TOKEN_EXPIRES_TIME,
            },
          );

          // Create a refresh token
          const refreshToken = jwt.sign(
            { userId: user._id },
            REFRESH_TOKEN_SECRET,
            {
              expiresIn: REFRESH_TOKEN_EXPIRES_TIME,
            },
          );

          // Set refersh token in refreshTokens array
          refreshTokens.push(refreshToken);

          // Send JWT refresh and access tokens
          return res.json({
            accessToken,
            refreshToken,
          });
        },
      ).catch(
        (error) => res.status(500).json({
          error,
        }),
      );
      return true;
    },
  ).catch(
    (error) => res.status(500).json({
      error,
    }),
  );
  return true;
};

// Generate new access token = require(refresh toke)n
exports.token = (req, res) => {
  const { refreshToken } = req.body;

  // Token not found
  if (!refreshToken) {
    return res.status(401).json({
      error: 'Authorization failed',
    });
  }

  // If the refresh token does not exist in the array
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }

  try {
    const jwtData = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
    );

    const { userId } = jwtData;

    // Generate a new access token by using refresh token's payload if not expired
    const accessToken = jwt.sign(
      { userId },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_TIME },
    );
    return res.json({ accessToken });
  } catch (error) {
    // Remove the expired refresh tokens = require(the arra)y
    refreshTokens = clearUserRefreshTokens(refreshToken, refreshTokens);
    return res.status(403).json({
      error: 'Refresh token expired',
    });
  }
};

// Deauthenticate/logout by deleting refresh token
exports.logout = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({
      error: 'Refresh token not found',
    });
  }
  // refreshTokens = refreshTokens.filter((rtoken) => rtoken !== refreshToken);
  refreshTokens = clearUserRefreshTokens(refreshToken, refreshTokens);
  return res.sendStatus(204);
};
