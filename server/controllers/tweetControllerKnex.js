const { knex } = require('../knex');

const getAllTweets = async (req, res, next) => {
  try {
    const result = await knex
      .select('*')
      .from('Tweet')
      .join('User', 'Tweet.authorid', '=', 'User.id')
     // .join('Comment', 'Tweet.id', '=', 'Comment.tweetId')
      .orderBy('createdAt' ,'desc');

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { getAllTweets };
