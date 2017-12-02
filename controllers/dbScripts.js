const db = require("../models");
// const compPass = require("../models/user.js").comparePassword();
const bcrypt = require("bcrypt");

module.exports = {
	findUser: function(req, res) {
		console.log(req);
		db.User
			.findOne({ username: req.body.username })
			.exec(function(err, user) {
				// console.log(req.body.password + ', ' + user.password );
				if (!user) {
					return res.status(500).send("No User Found");
				}
				if (req.body.password !== user.password) {
					res.status(500).send("Invalid Password");
				} else {
					res.json(user);
				}
			})
			.catch(err => res.status(422).json(err));
	},
	createUser: function(req, res) {
		console.log(req.body);
		db.User
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	addNewCat: function(req, res) {
		console.log(req.body);
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$push: { "cat": req.body.cat }}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	pushNewUrl: function(req, res) {
		console.log(req.body);
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$push: { "links": { "url": req.body.url, "cat": req.body.cat}}}, {new: true})
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	deleteCat: function(req, res) {
		console.log(req.body);
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$pull: { "cat": req.body.cat }}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	changeCat: function(req, res) {
		console.log(req.body);
		db.User
			.findOneAndUpdate({ password : req.body.userkey, "links._id": req.body.url_id }, {$set: { "links.$.cat": req.body.cat }}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	removeFromCat: function(req, res) {
		console.log(req.body);
		db.User 
			.updateMany({ password: req.body.session, "links.cat": req.body.delCat}, {$set: { "links.$.cat": "None"}}, { new: true })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
	},
	findUrls: function(req, res) {
		console.log(req.body);
		db.User
			.findOne({ password: req.body.session})
			.then(dbUser => res.json(dbUser))
			.catch(err => res.json(err));
	},
	removeUrl: function(req, res) {
		console.log(req.body);
		db.User
			.findOneAndUpdate({ password: req.body.session }, {$pull: { "links": { "_id": req.body.url_id }}}, {new: true})
			.then(dbModel => {
				console.log(dbModel);
				res.json(dbModel);
			})
			.catch(err => res.json(err));
	},
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