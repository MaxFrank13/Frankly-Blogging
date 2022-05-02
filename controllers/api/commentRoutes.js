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
router.get('/all/:id', async (req, res) => {
  try {

    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
          order: [['id', 'DESC']]
        },
      ],
    });
    
    const thread = threadData.get({ plain: true });

    res.status(200).json(threadData);

    // res.render('forum', {
    //   ...thread,
    //   logged_in: req.session.logged_in
    // });

  } catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;