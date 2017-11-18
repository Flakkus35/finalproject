var db = require("../models");
var path = require("path");

module.exports = app => {
	app.post("/api/user/create", function(req, res) {
		db.User
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.json(err));
		});
}