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

// GET route to get the thread and all of its comments (withAuth)
router.get('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    });

    const thread = threadData.get({ plain: true });

    res.render('forum', {
      ...thread,
      logged_in: true
    })

  } catch(err) {
    res.status(500).json(err);
  };
});

// GET route for editing a thread by its id
router.get('/edit/:id', withAuth, async (req, res) => {
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
      logged_in: true,
      ...thread,
      state: 'edit',
      edit: true
    })
  } catch(err) {
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


module.exports = router;


// DELETE route to remove thread (withAuth)