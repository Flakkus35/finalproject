const router = require("express").Router();
const dbControl = require("../../controllers/dbScripts");

router.route("/create")
	.post(dbControl.createUser);

router.route("/login")
	.put(dbControl.findUser);

module.exports = router;