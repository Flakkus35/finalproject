const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models/user.js");

passport.use(new LocalStrategy(
	function(username, password, done) {
		db.User
			
	}
));

