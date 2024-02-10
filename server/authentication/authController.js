const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');
const { Readable } = require('stream');
require('dotenv').config();

const register = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      if (!req.file) {
        return res
          .status(500)
          .json({ message: 'Profile photo is needed for registration' });
      }

      try {
        const base64String = req.file.buffer.toString('base64');
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64String}`,
          { resource_type: 'auto' }
        );
        const photo = result.secure_url;

        // Logging here after accessing the request body
        console.log('firstname', req.body.firstName);
        console.log('lastname', req.body.lastName);
        console.log('email', req.body.email);
        console.log('password', req.body.password);

        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //   console.error(errors.array());
        //   return res.status(400).json({ errors: errors.array() });
        // }

        const {
          firstName,
          lastName,
          email,
          password,
          profile,
          profileImageBackground,
        } = req.body;

        const userExist = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (userExist) {
          return res.status(400).json({ errors: 'User already exists.' });
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
          .json({ person: person, message: 'Person successfully created' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
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

// const updateAll = async (req, res) => {
//   try {
//     // Upload profile photo and profile image background
//     upload.fields([
//       { name: 'photo', maxCount: 1 },
//       { name: 'profileImageBackground', maxCount: 1 },
//     ])(req, res, async (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'File upload failed' });
//       }

//       try {
//         // Check if photo file is uploaded
//         if (
//           !req.files ||
//           !req.files['photo'] ||
//           req.files['photo'].length === 0
//         ) {
//           return res.status(400).json({ error: 'Profile photo is required' });
//         }

//         // Check if profile image background file is uploaded
//         if (
//           !req.files ||
//           !req.files['profileImageBackground'] ||
//           req.files['profileImageBackground'].length === 0
//         ) {
//           return res
//             .status(400)
//             .json({ error: 'Profile image background is required' });
//         }

//         // Handle file uploads
//         const photoFile = req.files['photo'][0];
//         const profileImageBackgroundFile =
//           req.files['profileImageBackground'][0];

//         // Upload files to Cloudinary or any other storage service
//         const photoResult = await cloudinary.uploader.upload(photoFile.path, {
//           resource_type: 'auto',
//         });
//         const profileImageBackgroundResult = await cloudinary.uploader.upload(
//           profileImageBackgroundFile.path,
//           { resource_type: 'auto' }
//         );

//         // Get secure URLs for the uploaded files
//         const photo = photoResult.secure_url;
//         const profileImageBackground = profileImageBackgroundResult.secure_url;

//         // Handle other form data
//         console.log('firstname', req.body.firstName);
//         console.log('lastname', req.body.lastName);
//         console.log('email', req.body.email);
//         console.log('password', req.body.password);
//         const { newPassword } = req.body;

//         // Hash new password
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(newPassword, salt);

//         // Update user data
//         const { firstName, lastName, profile } = req.body;
//         const updatedData = {
//           password: hashedPassword,
//           photo,
//           profileImageBackground,
//           firstName,
//           lastName,
//           profile,
//         };
//         const updatedUser = await prisma.user.update({
//           where: {
//             id: req.user.id,
//           },
//           data: updatedData,
//         });

//         return res.status(200).json({ data: updatedUser });
//       } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

const updateAll = async (req, res) => {
  try {
    // Upload profile image background
    upload.single('profileImageBackground')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      if (!req.file) {
        return res.status(500).json({
          message: 'Profile image background is needed for registration',
        });
      }

      try {
        const base64String = req.file.buffer.toString('base64');
        const resultTwo = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64String}`,
          { resource_type: 'auto' }
        );
        const profileImageBackground = resultTwo.secure_url;

        // Handle other form data
        console.log('firstname', req.body.firstName);
        console.log('lastname', req.body.lastName);
        console.log('email', req.body.email);
        console.log('password', req.body.password);
        const { newPassword } = req.body;

        // Hash new password
        //const salt = bcrypt.genSaltSync(10);
        //const hashedPassword = bcrypt.hashSync(newPassword, salt);

        // Update user data
        const { id,firstName, lastName, profile } = req.body;
        const updatedData = {
        //  password: hashedPassword,
          profileImageBackground, // Assign the profileImageBackground here
          firstName,
          lastName,
          profile,
        };
        const updatedUser = await prisma.user.update({
          where: {
            id: parseInt(id),
          },
          data: updatedData,
        });

        return res.status(200).json({ data: updatedUser });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = { login, register, passwordUpdate, updateAll };
