const { getRetweetsById, AllRetweets } = require('../controllers/retweetController');

const router = require('express').Router();

    router.get('/allretweets',AllRetweets)
 router.get('/retweets',getRetweetsById);


module.exports = router;
