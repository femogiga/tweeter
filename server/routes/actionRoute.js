const {
  getAllRetweetCount,
  getRetweetCount,
  getSavedCount,
  getLikeCount,
  getCommentLikeCount,
} = require('../controllers/ActionsController');

const router = require('express').Router();

router.get('/retweet/:tweetId', getRetweetCount);
router.get('/like/:tweetId', getLikeCount);
router.get('/saved/:tweetId', getSavedCount);
router.get('/commentlike/:commentId', getCommentLikeCount);

router.get('/retweet', getAllRetweetCount);

module.exports = router;
