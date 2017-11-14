const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	local: { username: String, password: String },
	// Add keys to settings when a new setting is developed
	// settings: {}
	links: [{ 
		url: String, 
		cat: {
			type: String,
			default: "none" 
		}
	}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;