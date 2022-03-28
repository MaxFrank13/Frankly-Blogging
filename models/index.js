const User = require('./User');
const Thread = require('./Thread');
const Comment = require('./Comment');

User.hasMany(Thread, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Thread.hasMany(Comment, {
	foreignKey: 'thread_id',
	onDelete: 'CASCADE'
});

Thread.belongsTo(User, {
	foreignKey: 'user_id'
});

Comment.belongsTo(User, {
	foreignKey: 'user_id'
});

Comment.belongsTo(Thread, {
	foreignKey: 'thread_id'
});

module.exports = {
  User,
  Thread,
  Comment
};