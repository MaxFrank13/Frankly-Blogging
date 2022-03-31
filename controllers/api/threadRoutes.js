const router = require('express').Router();
const { Thread, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route for thread form
router.get('/', withAuth, async (req, res) => {
  try {
    res.render('thread', {
      logged_in: req.session.logged_in,
      state: 'new',
      edit: false
    })
  } catch (err) {
		res.status(500).json(err);
  };
});


// POST route to create new thread (withAuth)
router.post('/', withAuth, async (req, res) => {
  try {
    const newThread = await Thread.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newThread);
  } catch(err) {
    res.status(400).json(err);
  };
});

// GET route for editing a thread by its id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment
        },
      ],
    });

    const thread = threadData.get({ plain: true });

    res.render('thread', {
      logged_in: req.session.logged_in,
      ...thread,
      state: 'edit',
      edit: true
    })
  } catch(err) {
    res.status(500).json(err);
  };
});

// PUT route for editted thread content

router.put('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {where: {id: req.params.id} }
    );
    res.status(200).json(threadData);
  } catch(err) {
    res.status(500).json(err);
  };
});

// DELETE route to remove thread (withAuth)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    res.status(200).json(threadData);

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
