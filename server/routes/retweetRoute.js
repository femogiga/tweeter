const { retweetPost } = require('../controllers/postController');
const {
  getRetweetsById,
  AllRetweets,
} = require('../controllers/retweetController');

const router = require('express').Router();

router.get('/allretweets', AllRetweets);
router.get('/retweets', getRetweetsById);
router.post('/', retweetPost);

module.exports = router;
