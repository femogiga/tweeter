const { likePost } = require('../controllers/postController');


const router = require('express').Router();


router.post('/', likePost);

module.exports = router;
