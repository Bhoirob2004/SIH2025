const express = require("express");
const {registerUser, loginUser} = require("../controller/userControl");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;