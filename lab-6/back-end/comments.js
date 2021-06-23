const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Configure multer so that it will upload to '/public/images'

const users = require('./users.js');
const User = users.model;
const validUser = users.valid;

const boards = require('./boards.js');
const Board = boards.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
  },
  comment: String,
  created: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

router.post('/', validUser, async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    user: req.user,
    board: req.body.board,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/', validUser, async (req, res) => {
  try {
    await Comment.updateOne(
      { _id: req.body.id },
      {
        comment: req.body.comment,
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.id });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:id', validUser, async (req, res) => {
  const board = await Board.find({
    _id: req.params.id,
  });
  try {
    const comments = await Comment.find({
      board: board,
    })
      .sort({
        created: -1,
      })
      .populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Comment,
};
