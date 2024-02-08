const { postComments } = require("../controllers/postCommentController");
const router = require("express").Router()

router.post('/', postComments);


module.exports = router
