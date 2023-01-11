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

      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      console.log('from dashboard route')
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a post
// router.post('/', withAuth, async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id
//         })
//         .then(dbPostData => res.json(dbPostData))
//     }
//     catch(err) {
//         res.json(err);
//     }
// })

module.exports = router;