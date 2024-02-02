const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { knex } = require('../knex');

const getRetweetsById = async (req, res, next) => {
  const result = await knex('Tweet').join('User', 'authorid', '=', 'User.id');
  //console.log(result);
  res.status(200).json(result);
};

const secondRetweets = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await knex('Retweet').select('*',
      knex.raw(
        '(SELECT COUNT(*) FROM "Like" WHERE "Like"."tweetId" = "Tweet"."id") as likeCount'
      ),
        knex.raw(
          '(SELECT COUNT(*) FROM "Retweet" WHERE "Retweet"."tweetId" = "Tweet"."id") as retweetCount'
        ),
        knex
          .raw(
            '(SELECT COUNT(*) FROM "Saved" WHERE "Saved"."tweetId" = "Tweet"."id") as saveCount'
          ))
          .join('User', 'User.id', '=', 'Retweet.userId')
          .join('Tweet', 'Tweet.id', '=', 'Retweet.tweetId')
          .where('userId', id);


    //console.log(result);
    res.status(200).json(result);
  } catch (err) {
        console.log(err);

    res.status(500).json(err);
  }
};

// const secondRetweets = async (req, res) => {
//   try {
//     const tweets = await knex('Tweet')
//       .select(
//         'Tweet.id',
//         'Tweet.content',
//         'Tweet.createdAt',
//         'User.firstName as firstname',
//         'User.lastName as lastname',

//         knex.raw(
//           '(SELECT COUNT(*) FROM "Like" WHERE "Like"."tweetId" = "Tweet"."id") as likeCount'
//         ),
//         knex.raw(
//           '(SELECT COUNT(*) FROM "Retweet" WHERE "Retweet"."tweetId" = "Tweet"."id") as retweetCount'
//         ),
//         knex.raw(
//           '(SELECT COUNT(*) FROM "Saved" WHERE "Saved"."tweetId" = "Tweet"."id") as saveCount'
//         )
//       )
//       .leftJoin('User', 'Tweet.authorid', '=', 'User.id')
//       .orderBy('Tweet.createdAt', 'desc');

//     res.status(200).json(tweets);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// };


const AllRetweets = async (req, res, next) => {
  try {
    const result = await knex('Retweet')
      .join('User', 'User.id', '=', 'Retweet.userId')
      .join('Tweet', 'Tweet.id', '=', 'Retweet.tweetId');
   // console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { getRetweetsById, secondRetweets, AllRetweets };
