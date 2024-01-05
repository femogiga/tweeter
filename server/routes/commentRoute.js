const {
  getAllComments,
  getCommentByTweetId,
} = require('../controllers/CommentController');

const router = require('express').Router();

router.get('/:tweetId', getCommentByTweetId); //

router.get('/', getAllComments);

module.exports = router;
