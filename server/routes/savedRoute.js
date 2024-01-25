const { savePost } = require('../controllers/postController');

const router = require('express').Router();

router.post('/', savePost);

module.exports = router;
