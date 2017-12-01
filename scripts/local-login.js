const User = require("mongoose").model('User');
const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, done) => {
	const userData = {
		username: username,
		password: password
	};

	return User.findOne({ username: userData.username }, (err, user) => {
		if (err) { return done(err); }
		if (!user) {
			const error = new Error('Incorrect email or password');
			error.name = 'IncorrectCredentialsError';
			return done(error);
		}

		return user.comparePassword(userData.password, (passwordErr, isMatch) => {
			if (err) return done(err);
			if (!isMatch) {
				const error = new Error('Incorrect email or password');
				error.name = 'IncorrectCredentialsError';
				return done(error);
			}
			return done(null, user);
		});
	});
});