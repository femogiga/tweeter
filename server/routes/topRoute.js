const router = require('express').Router();
const { getTopTweets, getLatestTweets } = require('../controllers/topController');

router.get('/toptweets', getTopTweets);
router.get('/latesttweets', getLatestTweets);

module.exports = router;
