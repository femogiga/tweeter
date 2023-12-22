const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



const getUserTweetsById = async (req, res) => {
  const  authorid  = req.params.authorid;
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


module.exports = { getUserTweetsById };
