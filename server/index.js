const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const socketIo = require('socket.io');
const tweetRoute = require('./routes/tweetRoute');
const authRoute = require('./authentication/authRoute');
const userTweetRoute = require('./routes/userTweetRoute');
const allRetweetRoute = require('./routes/retweetRoute');
const commentRoute = require('./routes/commentRoute');
const actionRoute = require('./routes/actionRoute');
const authMiddleware = require('./authentication/authMiddleware');
const postCommentRoute = require('./routes/postCommentRoute');
const topRoute = require('./routes/topRoute');
const statRoute = require('./routes/statRoute');
const bookmarkedRoute = require('./routes/bookmarkedRoute');
const followRoute = require('./routes/followRoute');
const savedRoute = require('./routes/savedRoute');
const followMiddleware = require('./middleware/followMiddleware');
const savedMiddleware = require('./middleware/savedMidlleware');
const retweetMiddleware = require('./middleware/retweetMiddleware');
const likeMiddleware = require('./middleware/likeMiddleware');
const likeRoute = require('./routes/likeRoute');
const commentLikeMiddleware = require('./middleware/commentLikeMiddleware');
const commentLikeRoute = require('./routes/commentLikeRoute');
const whocanReplyMiddleware = require('./middleware/whocanReplyMiddleware');
const app = express();
app.use(express.static('images'));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/tweets', authMiddleware, tweetRoute);
app.use('/users', authMiddleware, userTweetRoute);
app.use('/retweets', authMiddleware, retweetMiddleware, allRetweetRoute);
app.use('/comments', authMiddleware, commentRoute);
app.use('/actions', authMiddleware, actionRoute);
app.use('/stats', authMiddleware, statRoute);
app.use('/bookmarks', authMiddleware, bookmarkedRoute);
app.use('/like', authMiddleware, likeMiddleware, likeRoute);
app.use('/explore', topRoute);
app.use('/follow', authMiddleware, followMiddleware, followRoute);
app.use('/saved', authMiddleware, savedMiddleware, savedRoute);
app.use(
  '/commentlike',
  authMiddleware,
  commentLikeMiddleware,
  commentLikeRoute
);
app.use(
  '/createcomment',
  authMiddleware,
  // whocanReplyMiddleware,
  postCommentRoute
);

app.get('/', (req, res) => {
  res.send('Welcome to my application');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('listening on port ' + port);
});
