const router = require("express").Router();
const dbControl = require("../../controllers/dbScripts");

router.route("/create")
	.post(dbControl.createUser);

module.exports = router;