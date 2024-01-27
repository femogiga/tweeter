const { knex } = require('../knex');

const retweetMiddleware = async (req, res, next) => {
  const {tweetId } = req.body;

  try {
    if (tweetId) {
      /*
       * the follower middleware  check if the post is already saved or not.
       *  the {saved} property is attached as {saved or not saved}. this is then used in the
       * the controller to determine if the user whether to delete or update the relationship
       */

      const isPostRetweeted = await knex
        .from('Retweet')
        .select('*')
        .where('Retweet.tweetId', tweetId)
        .andWhere('Retweet.userId', req.user.id);
      if (Object.keys(isPostRetweeted).length > 0) {
        req.retweeted = 'retweeted';
      } else {
        req.retweeted = 'notRetweeted';
      }
    }
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = retweetMiddleware;
