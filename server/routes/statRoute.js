const { getFollowingStat } = require('../controllers/statController');

const router = require('express').Router();


router.get('/:id' , getFollowingStat)



module.exports =router
