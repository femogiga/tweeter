const { body, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer();

const validateRegistration = (req, res, next) => {
  upload.single('photo')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'File upload failed' });
    }

    if (!req.file) {
      return res
        .status(500)
        .json({ message: 'Profile photo is needed for registration' });
    }

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   console.error(errors.array());
    //   return res.status(400).json({ errors: errors.array() });
    // }

    next();
  });
};

module.exports = validateRegistration;
