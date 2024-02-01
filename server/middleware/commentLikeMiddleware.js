const { knex } = require('../knex');

const commentLikeMiddleware = async (req, res, next) => {
  const { commentId } = req.body;

  try {
    if (commentId) {
      /*
       * the commentLike middleware  check if the a comment is already liked or not.

       * the controller to determine if the user whether to delete or update the relationship
       */

      const isPostLiked = await knex
        .from('Like')
        .select('*')
        .where('Like.commentId', commentId)
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

module.exports = commentLikeMiddleware;
