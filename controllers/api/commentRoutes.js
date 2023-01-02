const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try{
        const result = await Comment.findAll();
        const comments = result.map((comment) => {
            return comment.get({plain: true})
        })
        res.status(200).json(comments);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

// Create a comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create(req.body)
        res.json(newComment)
    }
    catch(err) {
        res.json(err);
    }
})

module.exports = router;