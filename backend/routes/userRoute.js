//importations
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const password = require("../middleware/password");

//les routes
router.post("/signup", password, userControllers.signup);
router.post("/login", userControllers.login);

//exportation
module.exports = router;
