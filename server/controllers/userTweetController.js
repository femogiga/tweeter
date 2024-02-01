const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { knex } = require('../knex');

const getUserTweetsById = async (req, res) => {
  const authorid = req.params.authorid;
  try {
    const result = await prisma.tweet.findMany({
      include: {
        comments: true,
        like: true,
        saved: true,
        retweets: true, // Assuming Retweet is the correct field name
      },
      where: {
        authorid: parseInt(authorid),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getUserTweetsByIdWithComments = async (req, res) => {
  const authorid = req.params.authorid;
  try {
    const result = await prisma.tweet.findMany({
      include: {
        comments: true,
        retweets: true,
        like: true,
        saved :true
      },
      where: {
        authorid: parseInt(authorid),
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllTweetsWithComments = async (req, res,next) => {
  try {
    const result = await prisma.tweet.findMany({
      include: {
        comments: true,
        like: true,
        saved: true,
        retweets: true, // Assuming Retweet is the correct field name
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};






const getUserTweetsWithMedia = async (req, res) => {
  const authorid = parseInt(req.params.authorid);
  try {
    const result = await prisma.tweet.findMany({
      include: {
        comments: true,
        like: true,
        saved: true,
        retweets: true, // Assuming Retweet is the correct field name
      },
      where: {
        authorid: authorid,
        imageUrl: {
          not: null,
        },
      },
    });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// const getUserTweetsWithMedia = async (req, res) => {
//   const authorid = parseInt(req.params.authorid);
//   try {
//     const result = await knex('Tweet')
//       .where({
//         authorid: authorid,
//       })
//       .whereNotNull('imageUrl');

//     // console.log(result);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// };

module.exports = {
  getUserTweetsById,
  getUserTweetsByIdWithComments,
  getUserTweetsWithMedia,
  getAllTweetsWithComments,
};
