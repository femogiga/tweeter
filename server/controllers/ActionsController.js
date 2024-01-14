const { knex } = require('../knex');

const getRetweetCount = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.params.tweetId);
    const count = await knex('Retweet')
      .count('tweetId')
      .where('Retweet.tweetId', '=', tweetId);
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllRetweetCount = async (req, res, next) => {
  try {
    const count = await knex('Retweet').count('tweetId').groupBy('tweetId');
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getSavedCount = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.params.tweetId);
    const count = await knex('Saved')
      .count('tweetId')
      .where('Saved.tweetId', '=', tweetId);
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLikeCount = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.params.tweetId);
    const count = await knex('Like')
      .count(`tweetId`)
      .where('Like.tweetId', '=', tweetId);
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getCommentLikeCount = async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentId);
    const count = await knex('Like')
      .count('commentId')
      .where('Like.commentId', '=', commentId);
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getWhoTofollow = async (req, res, next) => {
  try {
    //const person = parseInt(req.params.commentId);
    const persons = await knex('User').where(
      'User.email',
      '!=',
      req.user.email
    );

    res.status(200).json(persons);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//

const getTweetsByFollowedUsers = async (req, res, next) => {
  try {
    const tweetsByFollowedUsers = await knex('Tweet')
      .join('Follower', 'Follower.personId', '=', 'Tweet.authorid')
      //.join('Comment', 'Comment.tweetId', '=', 'Tweet.id')
      .where('Follower.followerId', req.user.id); // Assuming req.user has the follower's ID
    //.groupBy('Tweet.id');

    res.status(200).json(tweetsByFollowedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
/*
   !TOD0 :continue with getTrends
* Get Trends feteches the count of retweet and comments
* to calculate the most popular tweets

*/
const getTrend = async (req, res, next) => {
  const tweets = await knex.from('Tweet').select('*');
  const comment = await knex
    .from('Tweet')
    .select('Tweet.id')
    .join('Comment', 'Tweet.id', '=', 'Comment.tweetId')
    .count('Tweet.id')
    .groupBy('Tweet.id');

  const retweet = await knex
    .from('Tweet')
    .select('Tweet.id')
    .join('Retweet', 'Retweet.tweetId', '=', 'Tweet.id')
    .count('Tweet.id')
    .groupBy('Tweet.id');

  const newArray = tweets.map((tweet) => {
    let commentCount = comment.find((item) => tweet.id === item.id);
    let retweetCount = retweet.find((item) => item.id === tweet.id);

    console.log(commentCount);
    return { ...tweet, commentCount, retweetCount };
  });
  console.table(newArray);

  // if (result.length > 0) {
  // }

  res.status(200).json(newArray);
};

// const cardTweets = async () => {
//   const tweets = await knex.select('*').from('Tweet').join('User', function () {
//     this.on(function () {
//       this.on('Tweet.authorid', '=', 'User.id')
//       this.on('Tweet.id' , '=','Comment.tweetId')
//     })
//   })
//   res.status(200).json(tweets);
// };

// const cardTweets = async (req, res) => {
//   try {
//     const tweets = await knex
//       .select('*')
//       .from('Tweet')
//       .join('User', 'Tweet.authorid', '=', 'User.id')
//       .join('Comment', 'Tweet.id', '=', 'Comment.tweetId')
//       .join('Like', 'Tweet.id', '=', 'Like.tweetId')

//     res.status(200).json(tweets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// };

module.exports = {
  getRetweetCount,
  getAllRetweetCount,
  getSavedCount,
  getLikeCount,
  getCommentLikeCount,
  getWhoTofollow,
  getTweetsByFollowedUsers,
  getTrend,
};
