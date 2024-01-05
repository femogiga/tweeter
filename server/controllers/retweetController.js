const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { knex } = require('../knex');

const getRetweetsById = async (req, res, next) => {
  const result = await knex('Tweet').join('User', 'authorid', '=', 'User.id');
  console.log(result);
  res.status(200).json(result);
};

const secondRetweets = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const result = await knex('Retweet')
      .join('User', 'User.id', '=', 'Retweet.userId')
      .join('Tweet', 'Tweet.id', '=', 'Retweet.tweetId')
      .where('userId', id);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const AllRetweets = async (req, res, next) => {
  try {
    const result = await knex('Retweet')
      .join('User', 'User.id', '=', 'Retweet.userId')
      .join('Tweet', 'Tweet.id', '=', 'Retweet.tweetId')
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { getRetweetsById, secondRetweets,AllRetweets};
