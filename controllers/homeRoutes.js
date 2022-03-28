const router = require('express').Router();
const { User, Thread } = require('../models');
const withAuth = require('../utils/auth');


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
		});
		const threads = threadData.map(thread => thread.get({ plain: true }));
		
		console.log(threads)
		res.render('homepage', {
			threads,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	};
});

// path to the user's profile after checking authorization
router.get('/profile', withAuth, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });
    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
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