const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./users.js');
const boards = require('./boards.js');
const comments = require('./comments.js');
const cors = require('cors');
// setup express
const app = express();

app.use(cors());
// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static('front'));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile('./front/index.html');
});
// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/lab6', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.get('/', (req, res) => {
  res.sendFile('./front/index.html');
});

app.use('/api/boards', boards.routes);
app.use('/api/users', users.routes);
app.use('/api/comments', comments.routes);
app.listen(4006, () => console.log('Server listening on port 4006!'));
