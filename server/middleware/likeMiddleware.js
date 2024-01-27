const { knex } = require('../knex');

const likeMiddleware = async (req, res, next) => {
  const { userId, id } = req.body;

  try {
    if (id) {
      /*
       * the follower middleware  check if the post is already saved or not.
       *  the {saved} property is attached as {saved or not saved}. this is then used in the
       * the controller to determine if the user whether to delete or update the relationship
       */

      const isPostLiked = await knex
        .from('Like')
        .select('*')
        .where('Like.tweetId', id)
        .andWhere('Like.userId', req.user.id);
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
