const {
  createMessage,
  getTweetsById,
  AllTweets,
} = require('../controllers/tweetController');

const router = require('express').Router();

router.get('/', AllTweets);
router.get('/', getTweetsById);
router.post('/', createMessage);

module.exports = router;
