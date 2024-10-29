const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

// POST create a new User in database & hash the password
router.post('/signup', userCtrl.signup);

// POST sends auth data and creates an auth token which also contains the UserID
router.post('/login', userCtrl.login);


module.exports = router;