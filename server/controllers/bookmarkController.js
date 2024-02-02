const { knex } = require('../knex');

const getTopBookmarkedTweets = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const result = await knex
      .from('Tweet')
      .leftJoin('Saved', 'Saved.tweetId', '=', 'Tweet.id')
      .leftJoin('User', 'User.id', '=', 'Tweet.authorid')
      .where('Saved.userId', req.user.id)
      .select(
        'Tweet.id as id',
        'Tweet.content as content',
        'Tweet.imageUrl as imageUrl',
        'Tweet.replyRestrictions as replyRestrictions',
        'Tweet.createdAt as createdAt',
        'Tweet.authorid as authorid',
        knex.raw('JSONB_AGG("Comment".*) as comments'),

        knex('Saved')
          .count('*')
          .as('savedCount')
          .whereRaw('??=??', ['Saved.tweetId', 'Tweet.id']),
        knex('Like')
          .count('*')
          .as('likeCount')
          .whereRaw('??=??', ['Like.tweetId', 'Tweet.id']),
        knex('Retweet')
          .count('*')
          .as('retweetCount')
          .whereRaw('??=??', ['Retweet.tweetId', 'Tweet.id'])
      )
      //   .where('Saved.tweetId', 'Tweet.id')
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')

      .groupBy('Tweet.id')
      .orderBy('retweetCount', 'desc');
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLatestBookmarkedTweets = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const result = await knex
      .from('Tweet')
      .leftJoin('Saved', 'Saved.tweetId', '=', 'Tweet.id')
      .leftJoin('User', 'User.id', '=', 'Tweet.authorid')
      .where('Saved.userId', req.user.id)
      .select(
        'Tweet.id as id',
        'Tweet.content as content',
        'Tweet.imageUrl as imageUrl',
        'Tweet.replyRestrictions as replyRestrictions',
        'Tweet.createdAt as createdAt',
        'Tweet.authorid as authorid',
        knex.raw('JSONB_AGG("Comment".*) as comments'),

        knex('Saved')
          .count('*')
          .as('savedCount')
          .whereRaw('??=??', ['Saved.tweetId', 'Tweet.id']),
        knex('Like')
          .count('*')
          .as('likeCount')
          .whereRaw('??=??', ['Like.tweetId', 'Tweet.id']),
        knex('Retweet')
          .count('*')
          .as('retweetCount')
          .whereRaw('??=??', ['Retweet.tweetId', 'Tweet.id'])
      )
      //   .where('Saved.tweetId', 'Tweet.id')
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')

      .groupBy('Tweet.id')
      .orderBy('Tweet.createdAt', 'desc');
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMediaBookmarkedTweets = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const result = await knex
      .from('Tweet')
      .leftJoin('Saved', 'Saved.tweetId', '=', 'Tweet.id')
      .leftJoin('User', 'User.id', '=', 'Tweet.authorid')
      .where('Saved.userId', req.user.id)
      .whereNotNull('Tweet.imageUrl')
      .select(
        'Tweet.id as id',
        'Tweet.content as content',
        'Tweet.imageUrl as imageUrl',
        'Tweet.replyRestrictions as replyRestrictions',
        'Tweet.createdAt as createdAt',
        'Tweet.authorid as authorid',
        knex.raw('JSONB_AGG("Comment".*) as comments'),

        knex('Saved')
          .count('*')
          .as('savedCount')
          .whereRaw('??=??', ['Saved.tweetId', 'Tweet.id']),
        knex('Like')
          .count('*')
          .as('likeCount')
          .whereRaw('??=??', ['Like.tweetId', 'Tweet.id']),
        knex('Retweet')
          .count('*')
          .as('retweetCount')
          .whereRaw('??=??', ['Retweet.tweetId', 'Tweet.id'])
      )
      //   .where('Saved.tweetId', 'Tweet.id')
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')

      .groupBy('Tweet.id')
      .orderBy('Tweet.createdAt', 'desc');
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLikedBookmarkedTweets = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await knex
      .from('Tweet')
      .leftJoin('Saved', 'Saved.tweetId', '=', 'Tweet.id')
      .leftJoin('User', 'User.id', '=', 'Tweet.authorid')
      .leftJoin('Like', 'Like.tweetId', '=', 'Tweet.id')
      .whereNotNull('Like.tweetId')
      .where('Saved.userId', req.user.id)
      .andWhere('Like.userId', req.user.id)

      .select(
        'Tweet.id as id',
        'Tweet.content as content',
        'Tweet.imageUrl as imageUrl',
        'Tweet.replyRestrictions as replyRestrictions',
        'Tweet.createdAt as createdAt',
        'Tweet.authorid as authorid',
        knex.raw('JSONB_AGG("Comment".*) as comments'),

        knex('Saved')
          .count('*')
          .as('savedCount')
          .whereRaw('??=??', ['Saved.tweetId', 'Tweet.id']),
        knex('Like')
          .count('*')
          .as('likeCount')
          .whereRaw('??=??', ['Like.tweetId', 'Tweet.id']),
        knex('Retweet')
          .count('*')
          .as('retweetCount')
          .whereRaw('??=??', ['Retweet.tweetId', 'Tweet.id'])
      )
      //   .where('Saved.tweetId', 'Tweet.id')
      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')

      .groupBy('Tweet.id')
      .orderBy('Tweet.createdAt', 'desc');
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTopBookmarkedTweets,
  getLatestBookmarkedTweets,
  getMediaBookmarkedTweets,
  getLikedBookmarkedTweets,
};
