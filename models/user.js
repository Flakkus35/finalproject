const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
// const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	cat: Array,
	links: [{ 
		url: String, 
		cat: {
			type: String,
			default: "None" 
		}
	}]
});

// compares entered password to hashed password on login
userSchema.methods.comparePassword = function comparePassword(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// creates a hashed password for a new user
userSchema.pre('save', function saveHook(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	return bcrypt.genSalt((saltError, salt) => {
		if (saltError) { return next(hashError); }
		return bcrypt.hash(user.password, salt, (hashError, hash) => {
			if (hashError) { return next(hashError); }
			user.password = hash;
			return next();
		});
	});
});

const User = mongoose.model("User", userSchema);

module.exports = User;