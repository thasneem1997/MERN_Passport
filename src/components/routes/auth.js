const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, password });
    await user.save();

    const payload = {
      id: user.id,
    };

    jwt.sign(
      payload,
      '3fb624a737918d359a45ae43089e20f3f272621a89f304d7514a4eda35dc70071e53b632b89525f15e5ec8cd864217641240e7456a064625fed15ba550731a', 
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
    };

    jwt.sign(
      payload,
      '3fb624a737918d359a45ae43089e20f3f272621a89f304d7514a4eda35dc70071e53b632b89525f15e5ec8cd864217641240e7456a064625fed15ba550731a',  
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.logout();
  res.json({ msg: 'Logged out successfully' });
});

module.exports = router;
