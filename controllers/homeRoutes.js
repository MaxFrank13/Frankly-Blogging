const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


// get home page and display posts
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['name']
				},
			],
		});

		const posts = postData.map(post => post.get({ plain: true }));

		res.render('homepage', {
			posts,
			logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	};
});

// path to the user's profile after checking authorization

router.get('/profile', withAuth, async (req, res) => {
	try {
		
	} catch (err) {

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