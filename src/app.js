const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv/config');
const stuffRoutes = require('./routes/stuff');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const PORT = process.env.PORT || 8000;

// DB connection
mongoose.connect(`mongodb://localhost:27017/test`)
  .then((_) => {
    console.log('DB successfully connected!');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// register routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/stuff', stuffRoutes);

// handler for 404 - Resource Not Found
app.use((_, res) => {
  res.status(404).send('We think you are lost!');
});

// handler for error 500
app.use((err, _, res) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});

// server creation
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
