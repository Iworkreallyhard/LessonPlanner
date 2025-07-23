const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.sendStatus(201);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in' });
});

router.get('/logout', (req, res) => {
  req.logout(() => res.sendStatus(200));
});

module.exports = router;
