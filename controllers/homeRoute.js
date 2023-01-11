const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Render home page
router.get('/', (req, res) => {
  Post.findAll({
      attributes: [
          'id',
          'title',
          'content',
          'created_at',
        ],
      order: [[ 'created_at', 'DESC']],
      include: [
          {
              model: User,
              attributes: ['username']
          },
          {
              model: Comment,
              attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          }
      ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    console.log(posts)
    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});



// login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        console.log(req.session.user_id)
        res.redirect('/');
        return;
    }

    res.render('login');
});

// signup
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
}

  res.render('signup');
});


module.exports = router;