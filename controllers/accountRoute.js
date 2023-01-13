const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth');


// render avatar selection
router.get('/', withAuth, (req, res) => {
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
            console.log(user)
            res.render('avatar', { user, logged_in: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// edit avatar from dashboard
router.get('/dashboard/edit-avatar', withAuth, (req, res) => {
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
            console.log(user)
            res.render('update-avatar', { user, logged_in: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// render page to create bio
router.get('/about', withAuth, (req, res) => {
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
            console.log(user)
            res.render('about', { user, logged_in: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// render bio edit
router.get('/dashboard/edit-bio', withAuth, (req, res) => {
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
            console.log(user)
            res.render('update-bio', { user, logged_in: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// render dashboard?
router.get('/dashboard', withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
                include: [{
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
                }]

            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            const user = dbUserData.get({ plain: true });
            console.log(user)
            res.render('dashboard', { user, logged_in: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Edit a post
router.get('/dashboard/edit/:id', withAuth, (req, res) => {
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


module.exports = router;