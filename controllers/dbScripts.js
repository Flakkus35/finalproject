const db = require("../models");

module.exports = {
	findUser: function(req, res) {

	},
	createUser: function(req, res) {
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