const { knex } = require('../knex');

const followMiddleware = async (req, res, next) => {
  const { followerId, personId } = req.body;
  try {
    if (followerId && personId) {
      /*
       * the follower middleware  check if the user is already following or not.
       *  the {follower} property is attached as {following or not following}. this is then used in the
       * the controller to determine if the user whether to delete or update the relationship
       */
      const isUserfollowing = await knex
        .from('Follower')
        .select('*')
        .where('Follower.followerId', req.user.id)
        .andWhere('Follower.personId', personId);
      if (Object.keys(isUserfollowing).length > 0) {
        req.follower = 'following';
      } else {
        req.follower = 'notfollowing';
      }
    }
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = followMiddleware;
