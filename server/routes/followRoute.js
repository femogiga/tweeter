const { followPerson } = require('../controllers/postController')

const router = require('express').Router()


router.post('/', followPerson)


module.exports = router
