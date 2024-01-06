const {
  getAllRetweetCount,
  getRetweetCount,
} = require('../controllers/ActionsController');

const router = require('express').Router();

router.get('/retweet/:tweetId', getRetweetCount);
router.get('/retweet', getAllRetweetCount);

module.exports = router;
