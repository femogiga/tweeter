const {
  getTopBookmarkedTweets,
  getLatestBookmarkedTweets,
  getMediaBookmarkedTweets,
  getLikedBookmarkedTweets,
} = require('../controllers/bookmarkController');

const router = require('express').Router();

router.get('/tweets', getLatestBookmarkedTweets);
router.get('/media', getMediaBookmarkedTweets);
router.get('/likes', getLikedBookmarkedTweets);
router.get('/latest', getTopBookmarkedTweets);

module.exports = router;
