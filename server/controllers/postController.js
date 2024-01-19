const { knex } = require('../knex');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
let api_secret = process.env.CLOUDINARY_API_SECRET;
let cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
console.log('secret=====>', api_secret);
console.log('cloud_name=====>', cloud_name);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const personImage = './images/person.jpg';

(async function run() {
  try {
    const result = await cloudinary.uploader.upload(personImage);
    console.log(result);
  } catch (error) {
      console.error(error);
  }
})();

////

const postTweets = async (req, res, next) => {
  //   try {
  //     const { content, imageUrl, replyRestrictions } = req.body;
  //     const posted = await knex('Tweet').insert({
  //       content,
  //       imageUrl,
  //       replyRestrictions,
  //       authorid: req.user.id,
  //     });
  //     res.status(200).json(posted);
  //   } catch (error) {
  //     console.error(error);
  //   }
};
//
module.exports = { postTweets };
