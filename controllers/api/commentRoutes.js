const router = require('express').Router();
const { Comment } = require('../../models');
const { withAuth } = require('../../utils/auth')

// Get all comments
router.get('/', async (req, res) => {
    try {
        const result = await Comment.findAll();
        const comments = result.map((comment) => {
            return comment.get({ plain: true })
        })
        res.status(200).json(comments);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Create a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.json(newComment)
    }
    catch (err) {
        res.json(err);
    }
});

// delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;