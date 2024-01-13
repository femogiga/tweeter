const router = require('express').Router();
const { getTopTweets, getLatestTweets, topPeople, topMedia } = require('../controllers/topController');

router.get('/toptweets', getTopTweets);
router.get('/latesttweets', getLatestTweets);
router.get('/toppeople', topPeople)
router.get('/topmedia',topMedia)

module.exports = router;
