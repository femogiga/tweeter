const { knex } = require('../knex');

const getAllComments = async (req, res, next) => {
  try {
    const allComments = await knex.select('*').from('Comment');
    res.status(200).json(allComments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

getCommentByTweetId = async (req, res, next) => {
  try {
    const tweetId = parseInt(req.params.tweetId);
    const result = await knex
      .select('*')
      .from('Comment')
      .where('tweetId', '=', tweetId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const postComment = async (req, res, next) => {};

module.exports = { getAllComments, getCommentByTweetId, postComment };
