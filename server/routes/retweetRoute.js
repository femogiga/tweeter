const { getRetweetsById } = require('../controllers/retweetController');

const router = require('express').Router();

router.get('/retweets',getRetweetsById);


module.exports = router;
