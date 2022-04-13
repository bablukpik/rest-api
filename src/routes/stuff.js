const express = require('express');
const router = express.Router();
const stuffController = require('../controllers/stuff');
const auth = require('../middlewares/auth');

router.get('/', auth, stuffController.getAllStuff);
router.post('/', auth, stuffController.createThing);
router.get('/:id', auth, stuffController.getOneThing);
router.put('/:id', auth, stuffController.modifyThing);
router.delete('/:id', auth, stuffController.deleteThing);

module.exports = router;
