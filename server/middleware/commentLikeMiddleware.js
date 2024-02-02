const { knex } = require('../knex');

const commentLikeMiddleware = async (req, res, next) => {
  const { commentId } = req.body;

  try {
    /*
     * The commentLike middleware checks if a comment is already liked or not.
     * The controller determines whether the user needs to delete or update the relationship.
     */
    console.log('middlewareCommentId', commentId);
    if (commentId) {
      const isPostLiked = await knex
        .from('Like')
        .select('*')
        .where('Like.commentId', commentId)
        .andWhere('Like.userId', req.user.id);

      if (isPostLiked.length > 0) {
        req.commentLiked = 'liked';
      } else {
        req.commentLiked = 'notLiked';
      }

      next();
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = commentLikeMiddleware;
