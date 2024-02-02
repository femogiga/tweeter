const { postCommentLike } = require('../controllers/ActionsController');

const router = require('express').Router();

router.post('/', postCommentLike);
//router.get('/',getCommentLikeStatusForStyle );

module.exports = router;
