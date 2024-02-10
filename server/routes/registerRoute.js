const router = require('express').Router();
const { register } = require('../authentication/authController');
const validateRegistration = require('../authentication/validateRegistration');
const { body } = require('express-validator');

const registrationValidationRules = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  // Add more validation rules as needed
];


router.post('/' ,register);

module.exports = router;
