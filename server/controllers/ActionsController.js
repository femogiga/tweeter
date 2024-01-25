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

// const getWhoTofollow = async (req, res, next) => {
//   const newArr = [];
//   try {
//     //const person = parseInt(req.params.commentId);
//     const persons = await knex
//       .from('User')
//       .whereNot('User.email', req.user.email)
//       .select(
//         'User.id',
//         'User.firstName',
//         'User.lastName',
//         'User.photo',
//         'User.profile',
//         'User.profileImageBackground'
//         // 'Follower.followerId'
//       );
//     // .andWhere('Follower.personId', 'User.id')

//     //  .join('Follower', req.user.id, '=', 'Follower.personId');

//     const allFollowers = await knex
//       .from('Follower')
//       .select('*')
//       .where('Follower.followerId', '=', req.user.id);
//     console.log('allFollower', allFollowers);
//     const notFollowing = persons.filter((person) => {
//       for (all of allFollowers) {
//         if (all.personId !== person.id) {
//           return all;
//         }
//       }
//     });
//     console.log('notFollowing', notFollowing);
//     //const newArray = persons.map((person) =>person.followerId !=req.user.id)
//     res.status(200).json(notFollowing);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

const getWhoTofollow = async (req, res, next) => {
  try {
    const persons = await knex
      .from('User')
      .whereNot('User.email', req.user.email)
      .select(
        'User.id',
        'User.firstName',
        'User.lastName',
        'User.photo',
        'User.profile',
        'User.profileImageBackground'
      );

    const allFollowers = await knex
      .from('Follower')
      .select('*')
      .where('Follower.followerId', '=', req.user.id);

    const notFollowing = persons.filter((person) => {
      return !allFollowers.some((follower) => follower.personId === person.id);
    });

    console.log('notFollowing', notFollowing);
    res.status(200).json(notFollowing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


//

// const getWhoTofollow = async (req, res, next) => {
//   try {
//     const persons = await knex
//       .from('User')
//       .whereNot('User.email', req.user.email)
//       .whereNotExists(function () {
//         // Subquery to check if the user is already following the person
//         this.select('*')
//           .from('Follower')
//           .whereRaw('"Follower"."personId" = "User"."id"') // Use double quotes for table and column names
//           .andWhere('"Follower"."followerId" = ?', req.user.id);
//       })
//       .select(
//         'User.id',
//         'User.firstName',
//         'User.lastName',
//         'User.photo',
//         'User.profile',
//         'User.profileImageBackground'
//       );

//     console.log(persons);

//     res.status(200).json(persons);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

const getTweetsByFollowedUsers = (req, res, next) => {
  try {
    const tweetsByFollowedUsers = knex('Tweet')
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

// const calculateTweetByTag = async (tag) => {
//   try {
//     // const hashtag = '#Christmas';
//     const tweetCount = await knex('Tweet').select('Tweet.id')
//       .count('* as count')
//       .groupBy('Tweet.id')
//       .whereRaw('(LOWER("Tweet".content) LIKE ?)', [`%${tag}%`])

//     //console.log('tweetCount', tweetCount);
//     return  tweetCount ;
//   } catch (error) {
//     console.error(error);
//   }
// };
//calculateTweetByTag('nvidia');

/*
*Get Trends feteches the count of retweet and comments
* to calculate the most popular tweets

*/
const getTrend = async (req, res, next) => {
  try {
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

    /*
     *
     *  the newArray  is generated from the
     * query result of comment and retweet
     * to calculate the sum of the most popular tweets
     */

    const newArray = tweets.map((tweet) => {
      let commentCount = comment.find((item) => tweet.id === item.id);
      let retweetCount = retweet.find((item) => item.id === tweet.id);

      //console.log('newtweet====>', tweetCount);
      console.log(commentCount);
      return { ...tweet, commentCount, retweetCount };
    });
    const mostPopular = newArray
      .map((tweet) => {
        if (tweet.commentCount == undefined) {
          tweet.commentCount = { id: tweet.id, count: 0 };
        }
        if (tweet.retweetCount == undefined) {
          tweet.retweetCount = { id: tweet.id, count: 0 };
        }

        const sum =
          parseInt(tweet?.commentCount?.count) +
          parseInt(tweet?.retweetCount?.count);

        /*
         *
         *  this regular expression '/#\w+/g' extracts tags
         * from the content of  tweets
         */
        const regex = /#\w+/g;
        let contentText = tweet.content;
        tag = contentText.match(regex);

        console.log('text===>', tag);
        console.log('sum===>', sum);
        return { id: tweet.id, tag: tag[0], sum };
      })
      .sort((a, b) => b.sum - a.sum)
      .slice(0, 7);
    //console.table(newArray);
    // try {
    //  // const hashtag = '#Christmas';
    //   const tweetCount = await knex('Tweet')
    //     .count('*')
    //     .whereRaw('(LOWER("Tweet".content) LIKE ?)', [
    //       `%${tag}%`,
    //     ]);
    //   console.log('tweetCount', tweetCount);
    // } catch (error) {
    //   console.error(error);
    // }

    console.log('mostpopular====>', mostPopular);

    res.status(200).json(mostPopular);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// const getTweetByTags = async (req, res, next) => {
//   const tags = req.params.tags
//   const tweetArray = []
//   try {
//     const tweetByTrend = await knex.from('Tweet').select('*');
//      const ByTrend = await knex.from('Comment').select('*');
//     console.log('tagStr===>', tweetByTrend);

//        const result = tweetByTrend.forEach((tweet) => {
//          if (tweet?.content.includes(tags)) {
//            tweetArray.push(tweet)
//          }
//        });
//       //console.log('tag===>', result);
//       res.status(200).json(tweetArray);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// };

const getTweetByTags = async (req, res, next) => {
  const tags = req.query.tags;
  try {
    const result = await knex

      .from('Tweet')
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

      .leftJoin('Comment', 'Tweet.id', '=', 'Comment.tweetId')
      .groupBy('Tweet.id')
      .orderBy('Tweet.createdAt', 'desc');

    const newArr = [];
    result.forEach((tweet) => {
      if (tweet.content.includes(tags)) {
        newArr.push(tweet);
      }
    });
    console.log('newArr', newArr);
    res.status(200).json(newArr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = {
  getRetweetCount,
  getAllRetweetCount,
  getSavedCount,
  getLikeCount,
  getCommentLikeCount,
  getWhoTofollow,
  getTweetsByFollowedUsers,
  getTrend,
  getTweetByTags,
};
