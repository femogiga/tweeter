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
const topRoute = require('./routes/topRoute');
const statRoute = require('./routes/statRoute');
const bookmarkedRoute = require('./routes/bookmarkedRoute');
const app = express();
app.use(express.static('images'))
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/tweets', authMiddleware, tweetRoute);
app.use('/users', authMiddleware, userTweetRoute);
app.use('/retweets', authMiddleware, allRetweetRoute);
app.use('/comments', authMiddleware, commentRoute);
app.use('/actions',authMiddleware, actionRoute);
app.use('/stats',authMiddleware, statRoute);
app.use('/bookmarks', authMiddleware, bookmarkedRoute);
app.use('/explore', topRoute);
app.get('/', (req, res) => {
  res.send('Welcome to my application');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('listening on port ' + port);
});
