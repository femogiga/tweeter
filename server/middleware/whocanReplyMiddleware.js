const { knex } = require('../knex');

const whocanReplyMiddleware = async (req, res, next) => {
  const { tweetId } = req.body;

  try {
    //    const id = parseInt(tweetId);
    console.log('req.body', req.body);
    const tweet = await knex
      .from('Tweet')
      .select('*')
      .where( 'Tweet.id', tweetId )

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    const { replyRestrictions, authorid } = tweet;

    if (replyRestrictions === 'everyone') {
      next();
    } else {
      if (replyRestrictions === 'Followers') {
        const checkFollower = await knex('Follower')
          .select('*')
          .where('personId', authorid)
          .andWhere('followerId', req.user.id);

        if (!(checkFollower.length > 0)) {
          return res.status(403).json({ message: 'Only followers can reply' });
        } else {
          req.canReply = 'canReply';
        }
      }

      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = whocanReplyMiddleware;
