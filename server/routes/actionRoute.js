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
  getTweetByTags,
  getFollowByUserIdForButtonStatus,
  getFollowedUsers,
  getAllRetweetsForCard,
  getAllSavedForCard,
  getAllLikeForCard,
} = require('../controllers/ActionsController');

const router = require('express').Router();

router.get('/retweet/:tweetId', getRetweetCount);
router.get('/like/:tweetId', getLikeCount);
router.get('/saved/:tweetId', getSavedCount);
router.get('/commentlike/:commentId', getCommentLikeCount);
router.get('/tweets', getTweetByTags);
router.get('/whotofollow', getWhoTofollow);
router.get('/retweet', getAllRetweetCount);
router.get('/tweetbyfollowers', getTweetsByFollowedUsers);
router.get('/trends', getTrend);
router.get('/buttonstatus', getFollowByUserIdForButtonStatus);
router.get('/followermodal', getFollowedUsers);
router.get('/retweetsforstyle', getAllRetweetsForCard);
router.get('/savesforstyle', getAllSavedForCard);
router.get('/likesforstyle', getAllLikeForCard);
// router.get('/trials',cardTweets)
module.exports = router;
