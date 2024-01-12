const { knex } = require('../knex');

const getTopTweets = async (req, res, next) => {
  try {
    const result = await knex
      .select(
        'Tweet.*',
        knex.raw('COUNT("Retweet"."tweetId") as "retweetCount"'),
        knex.raw('JSONB_AGG("Comment".*) as comments')
      )
      .from('Tweet')
      .leftJoin('Retweet', 'Tweet.id', '=', 'Retweet.tweetId')
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')
      .join('User', 'Tweet.authorid', '=', 'User.id')
      .groupBy('Tweet.id')
      .orderBy(knex.raw('COUNT("Retweet"."tweetId")'), 'desc'); // Order by retweetCount in descending order

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTopTweets };
