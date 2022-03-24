const express = require('express');
const router = express.Router();
const CustomerModel = require('../models/customer.model');

// GET
router.get('/', async (req, res) => {
  // Sample server side validation
  // if(!req.query.email) {
  //   return res.status(400).send('Missing URL parameter: email');
  // }
  
  // Promise thenable
  // CustomerModel.findOne({
  //   email: req.query.email
  // })
  //   .then(doc => {
  //     res.json(doc)
  //   })
  //   .catch(err => {
  //     res.status(500).json(err)
  //   });

  try {
    const foundCustomer = await CustomerModel
      .findOne({
        email: req.query.email,
      });
    res.status(200).send(foundCustomer);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Create a new customer
// POST localhost:3000/customer
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }

  // sample server side validation
  if (!req.body.email) {
    // ...
  }

  // Sample payload:
  // let user = {
  //   name: 'firstname lastname',
  //   email: 'email@gmail.com'
  // }

  let model = new CustomerModel(req.body);

  model.save()
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

// UPDATE
router.put('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Missing URL parameter: email')
  }

  CustomerModel.findOneAndUpdate({
    email: req.query.email
  }, req.body, {
    new: true
  })
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

// DELETE
router.delete('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Missing URL parameter: email')
  }

  CustomerModel.findOneAndRemove({
    email: req.query.email
  })
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      res.status(500).json(err)
    });
});

module.exports = router