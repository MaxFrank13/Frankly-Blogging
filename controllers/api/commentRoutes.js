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

// GET route for all of comments to a thread (withAuth)
router.get('/all/:thread_id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Thread,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
      where: {
        thread_id: req.params.thread_id,
      },
      order: [['date_created', 'DESC']]
    });

    const comments = commentData.map(comment => comment.get({ plain: true }));

    const { title, content, date_created } = comments[0].thread;
    const { name } = comments[0].thread.user;

    res.render('forum', {
      comments,
      title,
      content,
      name,
      date_created,
      thread_id: req.params.thread_id,
      logged_in: req.session.logged_in
    });

  } catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;