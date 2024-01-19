const { postTweets } = require('../controllers/postController');
const {
  getRetweetsById,
  secondRetweets,
} = require('../controllers/retweetController');
const {
  getUserData,
  getAllUserData,
} = require('../controllers/userController');
const {
  getUserTweetsById,
  getUserTweetsByIdWithComments,
  getUserTweetsWithMedia,
  getAllTweetsWithComments,
} = require('../controllers/userTweetController');

const router = require('express').Router();
router.get('/:authorid/tweets/comments', getUserTweetsByIdWithComments);
router.get('/:authorid/tweets/media', getUserTweetsWithMedia);

router.get('/:id/retweets', secondRetweets);
router.get('/:authorid/tweets', getUserTweetsById);
router.get('/allusers/alltweets', getAllTweetsWithComments);  // all tweets with comments
router.get('/allusers', getAllUserData);
router.get('/:id', getUserData);
router.get('/retweets', getRetweetsById);
router.post('/tweets',postTweets)

module.exports = router;
