const { postCommentLike } = require('../controllers/ActionsController');

const router = require('express').Router();

router.post('/', postCommentLike);

module.exports = router;
