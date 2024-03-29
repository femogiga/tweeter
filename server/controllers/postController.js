const { knex } = require('../knex');
const cloudinary = require('../config/cloudinaryConfig');
const upload = require('../config/multerConfig');
const { Readable } = require('stream');
require('dotenv').config();

const postTweets = async (req, res, next) => {
  try {
    upload.single('files')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      if (!req.file) {
        const { content, replyRestrictions } = req.body;
        const posted = await knex('Tweet').insert({
          content,
          replyRestrictions,
          authorid: req.user.id,
        });
        return res.status(200).json(posted);
      }

      const base64String = req.file.buffer.toString('base64');
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

const followPerson = async (req, res) => {
  const { personId } = req.body;
  let message = '';
  let result = null;
  try {
    /*
     * this block check if the user is already following
    by taking the result  of the follow middlware and deletes or updates as you usual
    //  */

    if (req.follower === 'following') {
      console.log('Follower is already following');
      result = await knex
        .from('Follower')
        .delete('*')
        .where('Follower.followerId', req.user.id)
        .andWhere('Follower.personId', personId);
      message = 'notFollowing';
    } else {
      console.log('follower is not following');
      result = await knex('Follower').insert({
        followerId: req.user.id,
        personId: personId,
      });
      message = 'following';
    }
    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const savePost = async (req, res) => {
  const { tweetId } = req.body;
  let message = '';
  let result = null;
  try {
    /*
     * this block check if the user post is already saved
    by taking the result  of the savedmiddlware and deletes or updates as you usual
    //  */

    if (req.saved === 'saved') {
      //console.log('post is already saved');
      result = await knex
        .from('Saved')
        .delete('*')
        .where('Saved.userId', req.user.id)
        .andWhere('Saved.tweetId', tweetId);
      message = 'savedRemoved';
    } else {
      // console.log('follower is not following');
      result = await knex('Saved').insert({
        userId: req.user.id,
        tweetId: parseInt(tweetId),
      });
      message = 'Saved';
    }
    res.status(200).json({ result, message });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const retweetPost = async (req, res) => {
  const { tweetId } = req.body;
  let message = '';
  let result = null;
  try {
    /*
     * this block check if the user post is already saved
    by taking the result  of the savedmiddlware and deletes or updates as you usual
    //  */

    if (req.retweeted === 'retweeted') {
      //console.log('post is already saved');
      result = await knex
        .from('Retweet')
        .delete('*')
        .where('Retweet.userId', req.user.id)
        .andWhere('Retweet.tweetId', tweetId);
      message = 'retweetRemoved';
    } else {
      // console.log('follower is not following');
      result = await knex('Retweet').insert({
        userId: req.user.id,
        tweetId: parseInt(tweetId),
      });
      message = 'retweeted';
    }
    res.status(200).json({ result, message });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const likePost = async (req, res, next) => {
  const { id } = req.body;
  let message = '';
  let result = null;
  try {
    /*
     * this block check if the user post is already saved
    by taking the result  of the savedmiddlware and deletes or updates as you usual
    //  */
    if (req.liked === 'liked') {
      //console.log('post is already saved');
      result = await knex
        .from('Like')
        .delete('*')
        .where('Like.userId', req.user.id)
        .andWhere('Like.tweetId', id);
      message = 'likeRemoved';
    } else {
      // console.log('follower is not following');
      result = await knex('Like').insert({
        userId: req.user.id,
        tweetId: parseInt(id),
      });
      message = 'liked';
    }
    res.status(200).json({ result, message });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  next()
};

module.exports = { postTweets, followPerson, savePost, retweetPost, likePost };
