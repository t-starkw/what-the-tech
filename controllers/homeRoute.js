const router = require('express').Router();
const withAuth = require('../utils/auth')
const { User } = require('../models');

// Render home page
router.get("/", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render dashboard
router.get('/dashboard', async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});


// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;