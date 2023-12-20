const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const socketIo = require('socket.io');
const tweetRoute = require('./routes/tweetRoute');
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/tweets', tweetRoute);
app.get('/', (req, res) => {
  res.send('Welcome to my application');
});

const port = process.env.PORT || 9000;

 app.listen(port, () => {
  console.log('listening on port ' + port);
});
