const { knex } = require('../knex');
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');
const { Readable } = require('stream');
require('dotenv').config();

const postTweets = async (req, res, next) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      // Convert the buffer to a Base64 string
      const base64String = req.file.buffer.toString('base64');

      // Upload the Base64 string to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64String}`,
        {
          resource_type: 'auto',
        }
      );

      const { content, replyRestrictions } = req.body;
      const imageUrl = result.secure_url;

      const posted = await knex('Tweet').insert({
        content,
        imageUrl,
        replyRestrictions,
        authorid: req.user.id,
      });

      res.status(200).json(posted);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { postTweets };
