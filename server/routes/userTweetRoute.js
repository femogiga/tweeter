const { getUserData } = require('../controllers/userController');
const { getUserTweetsById } = require('../controllers/userTweetController');

const router = require('express').Router();


router.get('/:authorid/tweets', getUserTweetsById);
router.get('/:id', getUserData);

module.exports = router;
