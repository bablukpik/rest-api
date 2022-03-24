const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');

const PORT = process.env.PORT || 3000;

// DB connection
mongoose.connect(`mongodb://localhost:27017/test`)
  .then((_) => {
    console.log('DB successfully connected!');
  })
  .catch((err) => {
    console.error(err);
  });

//app.use(express.static('./public'));
app.use(bodyParser.json());

app.use(personRoute);
app.use('/customer', customerRoute);

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next();
});

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
  res.status(404).send('We think you are lost!');
});

// Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, '../public/500.html'));
});

// Server creation
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));
