const { knex } = require('../knex');
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');
const { Readable } = require('stream');
require('dotenv').config();

const postComments = async (req, res, next) => {
  try {
    upload.single('replyImage')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }
      if (!req.file) {
        // If no file is provided, handle the case for tweets without an image
        const { reply, tweetId } = req.body;

        const posted = await knex('Comment').insert({
          reply,
          commentAuthorid: req.user.id,
          tweetId: tweetId,
        });

        return res.status(200).json(posted);
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

      const { reply, tweetId } = req.body;

      const imageUrl = result.secure_url;

      const posted = await knex('Comment').insert({
        reply,
        commentAuthorid: req.user.id,
        tweetId,
        replyImageUrl: imageUrl,
      });

      res.status(200).json(posted);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { postComments };
