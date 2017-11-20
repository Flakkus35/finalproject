const router = require("express").Router();
const dbControl = require("../../controllers/dbScripts");

router.route("/create")
	.post(dbControl.createUser);

router.route("/login")
	.put(dbControl.findUser);

router.route("/addurl")
	.put(dbControl.pushNewUrl);

router.route("/find")
	.put(dbControl.findUrls);

router.route("/delete")
	.put(dbControl.removeUrl);

module.exports = router;