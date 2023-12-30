const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, passwordUpdate } = require('./authController');

router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  login
);

router.patch(
  '/passwordupdate',
  [body('email').isEmail(), body('password').isLength({ min: 3 })],
  passwordUpdate
);
module.exports = router;
