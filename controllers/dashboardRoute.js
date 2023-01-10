const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { withAuth } = require('../utils/auth');


router.get('/dashboard', async (req, res) => {
    try {
      res.render("dashboard");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// // get all posts
// router.get('/', withAuth, (req, res) => {
//     Post.findAll({
//       attributes: [
//         'id',
//         'title',
//         'content',
//         'user_id',
//         'created_at'],
//       include: [
//         {
//           model: Comment,
//           attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
//           include: {
//             model: User,
//             attributes: ['name']
//           }
//         },
//         {
//           model: User,
//           attributes: ['name']
//         }
//       ]
//     })
//       .then(dbPostData => res.json(dbPostData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

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