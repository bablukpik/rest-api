const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// create a new user
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      user.save().then(
        () => {
          return res.status(201).json({
            message: 'User added successfully!'
          });
        }
      ).catch(
        (error) => {
          return res.status(500).json({ error });
        }
      );
    }
  );
};

// use it for authentication
exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          
          const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' });

          return res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          return res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      return res.status(500).json({
        error: error
      });
    }
  );
}
