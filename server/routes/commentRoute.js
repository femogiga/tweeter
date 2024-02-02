const { getCommentLikeStatusForStyle } = require('../controllers/ActionsController');
const {
  getAllComments,
  getCommentByTweetId,
} = require('../controllers/CommentController');

const router = require('express').Router();
router.get('/commentlikes', getCommentLikeStatusForStyle);
router.get('/:tweetId', getCommentByTweetId); //
router.get('/', getAllComments);

module.exports = router;
