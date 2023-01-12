const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

// render dashboard
router.get('/', withAuth, (req, res) => {

  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'avatar']
        }
      },
      {
        model: User,
        attributes: ['username', 'avatar']
      }
    ]
  })
    .then(dbPostData => {

      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      console.log('from dashboard route')
      res.render('dashboard', { posts, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit a post
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      console.log('from dashboard route')
      res.render('edit-post', { post, logged_in: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

// edit user avatar
router.get('/avatar', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      const user = dbUserData.get({ plain: true });
      res.render('edit-avatar', {user, logged_in: true});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });


module.exports = router;