const { knex } = require('../knex');

const getTopTweets = async (req, res, next) => {
  try {
    const result = await knex
      .select(
        'Tweet.*',
        knex.raw('COUNT("Retweet"."tweetId") as "retweetCount"'),
        knex.raw('COUNT("Saved"."tweetId") as "savedCount"'),
        knex.raw('JSONB_AGG("Comment".*) as comments')
      )
      .from('Tweet')
      .leftJoin('Retweet', 'Tweet.id', '=', 'Retweet.tweetId')
      .leftJoin('Saved', 'Tweet.id', '=', 'Saved.tweetId')
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')
      .join('User', 'Tweet.authorid', '=', 'User.id')
      .groupBy('Tweet.id', 'Saved.tweetId')
      .orderBy(knex.raw('COUNT("Retweet"."tweetId")'), 'desc'); // Order by retweetCount in descendorder

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLatestTweets = async (req, res, next) => {
  try {
    const result = await knex
      // .select(
      //   'Tweet.*',
      //   knex.raw('COUNT("Retweet"."tweetId") as "retweetCount"'),
      //   knex.raw('COUNT("Saved"."tweetId") as "savedCount"'),
      //   knex.raw('JSONB_AGG("Comment".*) as comments')
      // )
      // .from('Tweet')
      // .leftJoin('Retweet', 'Tweet.id', '=', 'Retweet.tweetId')
      // .leftJoin('Saved', 'Tweet.id', '=', 'Saved.tweetId')
      // .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')
      // .join('User', 'Tweet.authorid', '=', 'User.id')
      // //.groupBy('Tweet.id', 'Saved.tweetId')
      // .orderBy('Tweet.createdAt', 'desc'); // Order by retweetCount in descendorder
      .from('Tweet')
      .select(
        'Tweet.id as id',
        'Tweet.content as content',
        'Tweet.imageUrl as imageUrl',
        'Tweet.replyRestrictions as replyRestrictions',
        knex.raw('JSONB_AGG("Comment".*) as comments'),

        knex('Saved')
          .count('*')
          .as('savedCount')
          .whereRaw('??=??', ['Saved.tweetId', 'Tweet.id']),
        knex('Like')
          .count('*')
          .as('likeCount')
          .whereRaw('??=??', ['Like.tweetId', 'Tweet.id'])
      )
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')
      .groupBy('Tweet.id')
      .orderBy('Tweet.createdAt','desc')
      ;

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getTopTweets, getLatestTweets };
