const router = require('express').Router();
const { json } = require('express/lib/response');
const { User, Thread, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/all', async (req, res) => {
	try {
		const userData = await User.findAll({
			include: [{
				model: Thread
			},
			{
				model: Comment
			}]
		});

		const users = userData.map(user => user.get({ plain: true }));

		res.json(users);
	} catch (err) {
		res.status(500).json(err);
	}
})
// get home page and display threads
router.get('/', async (req, res) => {
	try {
		const threadData = await Thread.findAll({
			include: [
				{
					model: User,
					attributes: ['name']
				},
			],
			order: [['date_created', 'DESC']]
		});
		const threads = threadData.map(thread => thread.get({ plain: true }));
		
		res.render('homepage', {
			threads,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	};
});

// path to the user's dashboard after checking authorization
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Thread }],
    });
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	};
})


// path to a login page if the user is not already logged in
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	}

	res.render('login');
})

// path to a signup page if the user is not already logged in
router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	}

	res.render('signup');
})

module.exports = router;