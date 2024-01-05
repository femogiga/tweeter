const {
  createMessage,
  getTweetsById,
  AllTweets,
} = require('../controllers/tweetController');
const { getAllTweets } = require('../controllers/tweetControllerKnex');

const router = require('express').Router();

router.get('/alltweets', getAllTweets);
router.get('/', AllTweets);
router.get('/:id', getTweetsById);
router.post('/', createMessage);

module.exports = router;
