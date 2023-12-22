const { getUserTweetsById } = require('../controllers/userTweetController');

const router = require('express').Router();
router.get('/:authorid/tweets', getUserTweetsById);

module.exports = router;
