const express = require("express");
const {getData, getHistory} = require("../controller/cropControl");
const validateToken = require("../middleware/validateToken");

const router = express.Router();
router.use(validateToken);

router.route("/input").post(getData);
router.route("/history").get(getHistory);
module.exports = router;