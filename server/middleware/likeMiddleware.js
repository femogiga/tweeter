const { knex } = require('../knex');

const likeMiddleware = async (req, res, next) => {
  const { userId, tweetId } = req.body;

  try {
    if (tweetId && userId) {
      /*
       * the follower middleware  check if the post is already saved or not.
       *  the {saved} property is attached as {saved or not saved}. this is then used in the
       * the controller to determine if the user whether to delete or update the relationship
       */

      const isPostLiked = await knex
        .from('Like')
        .select('*')
        .where('Like.tweetId', tweetId)
        .andWhere('Like.userId', userId);
      if (Object.keys(isPostLiked).length > 0) {
        req.liked = 'liked';
      } else {
        req.liked = 'notLiked';
      }
    }
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = likeMiddleware;
