const express = require('express');
const Event = require('../models/Event');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
  const events = await Event.find({ user: req.user._id });
  res.json(events);
});

router.post('/', ensureAuthenticated, async (req, res) => {
  const newEvent = new Event({ ...req.body, user: req.user._id });
  await newEvent.save();
  res.status(201).json(newEvent);
});

router.delete('/:id', ensureAuthenticated, async (req, res) => {
  await Event.deleteOne({ _id: req.params.id, user: req.user._id });
  res.sendStatus(204);
});

module.exports = router;
