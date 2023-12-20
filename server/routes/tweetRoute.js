const { createMessage } = require('../controllers/tweetController');

const router = require('express').Router();

router.post('/', createMessage);

module.exports = router;
