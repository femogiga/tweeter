const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserData = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!user) {
      res.status(404).json({ message: 'not found' });
    }
    const {
      id,
      firstName,
      lastName,
      email,
      photo,
      profile,
      profileImageBackground,
    } = user;
    const dataToSend = {
      id,
      firstName,
      lastName,
      email,
      photo,
      profile,
      profileImageBackground,
    };
    res.status(200).json(dataToSend);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllUserData = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});

    if (!users) {
      res.status(404).json({ message: 'not found' });
    }
    const newArray = [];
    const dataToSend = users.map((user) => {
      const {
        id,
        firstName,
        lastName,
        email,
        photo,
        profile,
        profileImageBackground,
      } = user;
      newData = {
        id,
        firstName,
        lastName,
        email,
        photo,
        profile,
        profileImageBackground,
      };

    ;
      return newData;
    });

    res.status(200).json(dataToSend);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllUserData, getUserData };
