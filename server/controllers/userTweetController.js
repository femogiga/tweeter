const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { knex } = require('../knex');

const getUserTweetsById = async (req, res) => {
  const authorid = req.params.authorid;
  try {
    const result = await prisma.tweet.findMany({
      where: {
        authorid: parseInt(authorid),
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
      },
      where: {
        authorid: parseInt(authorid),
      },
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// const getUserTweetsWithMedia = async (req, res) => {
//   const authorid = parseInt(req.params.authorid);
//   try {
//     const result = await prisma.tweet.findMany({

//       where: {
//         authorid: authorid,
//         imageUrl: {
//           not:null,
//         }
//       },
//     });
//     console.log(result);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// };

const getUserTweetsWithMedia = async (req, res) => {
  const authorid = parseInt(req.params.authorid);
  try {
    const result = await knex('Tweet')
      .where({
        authorid: authorid,
      })
      .whereNotNull('imageUrl');

    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUserTweetsById,
  getUserTweetsByIdWithComments,
  getUserTweetsWithMedia,
};
