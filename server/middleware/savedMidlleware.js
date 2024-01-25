const { knex } = require('../knex');

const savedMiddleware = async (req, res, next) => {
    const { userId, tweetId } = req.body;

    try {
             if (tweetId && userId) {
               /*
                * the follower middleware  check if the post is already saved or not.
                *  the {saved} property is attached as {saved or not saved}. this is then used in the
                * the controller to determine if the user whether to delete or update the relationship
                */

               const isPostSaved = await knex
                 .from('Saved')
                 .select('*')
                 .where('Saved.tweetId', tweetId)
                 .andWhere('Saved.userId', userId);
               if (Object.keys(isPostSaved).length > 0) {
                 req.saved = 'saved';
               } else {
                 req.saved = 'notSaved';
               }
             }
    next();
  } catch (err) {
    console.error(err);
  }
};

module.exports = savedMiddleware;
