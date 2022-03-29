const router = require('express').Router();
const { Thread, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for creating a comment
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      thread_id: req.params.id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch(err) {
    res.status(400).json(err);
  };
});

module.exports = router;