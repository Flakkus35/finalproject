const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(LocalStrategy({}, function(username, password, done) {
	db.Users
		.findOne({ username: username })
		.then(dbUser => {
			if (!dbUser) { return done(null, false, { message: "Incorrect username" }); }
			else if (!db.Users.comparePassword(password)) { return done(null, false, { message: 'Incorrect password' }); }
			return done(null, dbUser);
		})
		.catch(err => console.log(err););
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;