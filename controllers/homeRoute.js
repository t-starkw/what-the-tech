const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
    try{
        const result = await Post.findAll();
        const posts = result.map((post) => {
            return post.get({plain: true})
        })
        // res.status(200).json(posts);
        res.render('home', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;