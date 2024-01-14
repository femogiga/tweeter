const {
  getAllRetweetCount,
  getRetweetCount,
  getSavedCount,
  getLikeCount,
  getCommentLikeCount,
  cardTweets,
  getWhoTofollow,
  getTweetsByFollowedUsers,
  getTrend,
} = require('../controllers/ActionsController');

const router = require('express').Router();

router.get('/retweet/:tweetId', getRetweetCount);
router.get('/like/:tweetId', getLikeCount);
router.get('/saved/:tweetId', getSavedCount);
router.get('/commentlike/:commentId', getCommentLikeCount);
router.get('/whotofollow' , getWhoTofollow)
router.get('/retweet', getAllRetweetCount);
router.get('/tweetbyfollowers', getTweetsByFollowedUsers);
router.get('/trends',getTrend)
// router.get('/trials',cardTweets)
module.exports = router;
