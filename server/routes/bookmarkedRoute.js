const {
  getTopBookmarkedTweets,
  getLatestBookmarkedTweets,
  getMediaBookmarkedTweets,
  getLikedBookmarkedTweets,
} = require('../controllers/bookmarkController');

const router = require('express').Router();

router.get('/:id/latest', getLatestBookmarkedTweets);
router.get('/:id/media', getMediaBookmarkedTweets);
router.get('/:id/likes', getLikedBookmarkedTweets);
router.get('/:id/top', getTopBookmarkedTweets);

module.exports = router;
