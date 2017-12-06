const db = require("../models");
const bcrypt = require("bcrypt");

module.exports = {
	// creates a new user
	createUser: function(req, res) {
		db.User
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	// pushs a new category to the current user
	addNewCat: function(req, res) {
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$push: { "cat": req.body.cat }}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	// pushs a new link w/cat to the current user
	pushNewUrl: function(req, res) {
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$push: { "links": { "url": req.body.url, "cat": req.body.cat}}}, {new: true})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	// deletes category from the current user
	deleteCat: function(req, res) {
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$pull: { "cat": req.body.cat }}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	// changes the category of the selected url
	changeCat: function(req, res) {
		db.User
			.findOneAndUpdate({ password : req.body.userkey, "links._id": req.body.url_id }, {$set: { "links.$.cat": req.body.cat }}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	// sets category of links to default if their previous category is deleted
	removeFromCat: function(req, res) {
		db.User 
			.updateMany({ password: req.body.session, "links.cat": req.body.delCat}, {$set: { "links.$.cat": "None"}}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	// finds all urls under the current user
	findUrls: function(req, res) {
		db.User
			.findOne({ password: req.body.session})
			.then(dbUser => res.json(dbUser))
			.catch(err => res.json(err));
	},
	// removes a url from the current user
	removeUrl: function(req, res) {
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$pull: { "links": { "_id": req.body.url_id }}}, {new: true})
			.then(dbModel => {
				res.json(dbModel);
			})
			.catch(err => res.json(err));
	},
	// finds a user with the right password
	testFind: function(req, res) {
		db.User.findOne({ username: req.body.username }, function(err, user) {
			if (err) throw err;
			if (!user) return res.status(500).send("No User Found");
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return res.json(user);
				} else {
					return res.status(500).send("Invalid Password");
				}
			});
		});
	}
}