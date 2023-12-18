const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(morgan('combined'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my application');
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log('listening on port ' + port);
});
