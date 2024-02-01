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
  const arr = [];
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

    const countFollower = await knex
      .from('Follower')
      .groupBy('personId')
      .select('personId')
      .countDistinct('followerId as followerCount');

    const arr = persons.map((person) => {
      const item = countFollower.find((item) => item.personId === person.id);

      const count = item ? item.followerCount : 0;

      return { ...person, count };
    });

    console.log('arr======>', arr);

    const notFollowing = arr.filter((person) => {
      return !allFollowers.some((follower) => follower.personId === person.id);
    });

    console.log('countFollower======>', notFollowing);

    //console.log('notFollowing', notFollowing);
    res.status(200).json(notFollowing);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/*
 * this api is used to determine the
 *state of follow button on profile page
 */
const getFollowByUserIdForButtonStatus = async (req, res, next) => {
  try {
    let buttonStatus = 'Follow';
    const personId = req.query.personId;
    // if (personId === req.user.id) {
    //   buttonStatus: 'disabled';
    //   //return res.status(200).json({buttonStatus});
    // }
    const follower = await knex
      .from('Follower')
      .select('*')
      .where('Follower.personId', '=', personId)
      .andWhere('Follower.followerId', '=', req.user.id);
    if (follower.length > 0) {
      buttonStatus = 'Following';
    }

    res.status(200).json({ buttonStatus });
  } catch (error) {
    res.status(400).json({ error });
  }
};

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
/*
 * this getFollowed the list of people followedby a user
 */
const getFollowedUsers = async (req, res, next) => {
  try {
    const personId = req.query.personId;
    const usersWithCount = await knex
      .from('Follower')
      .join('User', 'Follower.personId', '=', 'User.id')
      .groupBy('Follower.personId', 'User.id')
      .select('Follower.personId', 'User.*')
      .countDistinct('Follower.followerId as followerCount');

    const usersFollowed = await knex
      .from('Follower')
      .select('*')
      .where('Follower.personId', personId);
    const arr = usersWithCount.filter((user) => {
      return usersFollowed.some((item) => item.followerId === user.id);
    });
    res.status(200).json(arr);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

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
        /*
         * the below check content contains # and
        *prevent server from crashing if it doesn't
         */
        if (!contentText.includes('#')) {
          return;
        }
        tag = contentText.match(regex);

        //console.log('text===>', tag);
        //console.log('sum===>', sum);
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

/*
 *   getAllretweets is used to Style the color state of retweet button
 */
const getAllRetweetsForCard = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.query.tweetId);
    console.log('idforparam', tweetId);

    const retweets = await knex
      .from('Retweet')
      .select('Retweet.userId', 'Retweet.tweetId', 'User.firstName') // Adjust fields as needed
      .join('User', 'User.id', '=', 'Retweet.userId')

      .where('User.id', req.user.id);

    res.status(200).json(retweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getAllSavedForCard = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.query.tweetId);
    console.log('idforparam', tweetId);

    const saves = await knex
      .from('Saved')
      .select('Saved.userId', 'Saved.tweetId', 'User.firstName') // Adjust fields as needed
      .join('User', 'User.id', '=', 'Saved.userId')

      .where('User.id', req.user.id);

    res.status(200).json(saves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getAllLikeForCard = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.query.tweetId);
    //console.log('idforparam', tweetId);

    const likes = await knex
      .from('Like')
      .select('Like.userId', 'Like.tweetId', 'User.firstName') // Adjust fields as needed
      .join('User', 'User.id', '=', 'Like.userId')

      .where('User.id', req.user.id);

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
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
  getFollowByUserIdForButtonStatus,
  getFollowedUsers,
  getAllRetweetsForCard,
  getAllSavedForCard,
  getAllLikeForCard,
};
