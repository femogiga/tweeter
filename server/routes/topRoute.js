const router = require('express').Router();
const { getTopTweets } = require('../controllers/topController');

router.get('/toptweets', getTopTweets);

module.exports = router;
