const db = require("../models");

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

	},
	pushNewUrl: function(req, res) {

	},
	deleteCat: function(req, res) {

	},
	changeCat: function(req, res) {

	},
	removeFromCat: function(req, res) {
		
	}
}