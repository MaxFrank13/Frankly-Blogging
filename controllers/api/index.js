const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/thread', threadRoutes);
router.use('/comment', commentRoutes);

module.exports = router;