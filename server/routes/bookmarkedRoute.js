const {
  getTopBookmarkedTweets,
  getLatestBookmarkedTweets,
  getMediaBookmarkedTweets,
  getLikedBookmarkedTweets,
} = require('../controllers/bookmarkController');

const router = require('express').Router();

router.get('/top/:id/latest', getLatestBookmarkedTweets);
router.get('/top/:id/media', getMediaBookmarkedTweets);
router.get('/top/:id/like', getLikedBookmarkedTweets);
router.get('/top/:id', getTopBookmarkedTweets);

module.exports = router;
