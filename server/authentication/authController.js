const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const register = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      photo,
      profile,
      profileImageBackground,
    } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return res.status(400).json({ errors: 'user already exist.' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const person = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        photo: photo,
        profile: profile,
        profileImageBackground: profileImageBackground,
      },
    });
    return res
      .status(200)
      .json({ person: person, message: 'person successfully created' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ errors: err.message, error: 'internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ errors: 'Invalid credentials' });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ errors: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
      allowInsecureKeySizes: true,
      

    });
    console.log(token);
    const { id, firstName, lastName, photo, profile, profileImageBackground } =
      user;
    const dataToSend = {
      id,
      firstName,
      lastName,
      email,
      photo,
      profile,
      profileImageBackground,
    };
    return res.json({ token, user: dataToSend });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: 'Internal server error' });
  }
};

const passwordUpdate = async (req, res) => {
  try {
    const { id, email, password } = req.body;
    console.log(password);
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const updatedData = { email: email, password: hashedPassword };
    console.log(updatedData);
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updatedData,
    });
    return res.status(200).json({ data: updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};
module.exports = { login, register, passwordUpdate };
