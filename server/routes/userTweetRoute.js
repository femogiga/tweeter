const { getRetweetsById, secondRetweets } = require('../controllers/retweetController');
const { getUserData } = require('../controllers/userController');
const { getUserTweetsById } = require('../controllers/userTweetController');

const router = require('express').Router();
router.get('/:id/retweets', secondRetweets);
router.get('/retweets', getRetweetsById);
router.get('/:authorid/tweets', getUserTweetsById);
router.get('/:id', getUserData);
router.get('/retweets', getRetweetsById);

module.exports = router;
