const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000,
  },
});

const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

const boardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  path: String,
  title: String,
  description: String,
  price: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Board = mongoose.model('Board', boardSchema);

router.post('/', validUser, upload.single('board'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: 'Must upload a file.',
    });

  const board = new Board({
    user: req.user,
    path: '/images/' + req.file.filename,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    await board.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/', validUser, upload.single('board'), async (req, res) => {
  const myPath = req.file?.filename || req.body.path.split('/')[2];
  try {
    await Board.updateOne(
      {
        _id: req.body.id,
      },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        path: '/images/' + myPath,
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async (req, res) => {
  const id = req.params.id;
  try {
    await Board.deleteOne({
      _id: id,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/', validUser, async (req, res) => {
  // return photos
  try {
    let boards = await Board.find({
      user: req.user,
    })
      .sort({
        created: -1,
      })
      .populate('user');
    return res.send(boards);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/all', async (req, res) => {
  try {
    let boards = await Board.find()
      .sort({
        created: -1,
      })
      .populate('user');
    return res.send(boards);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Board,
  routes: router,
};
