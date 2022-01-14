//importations
const express = require("express");
const router = express.Router();
// const userController = require("../controllers/user");
const password = require("../middleware/password");

//les routes
router.post("/signup", password, userController.signup);
router.post("/login", userController.login);

//exportation
module.exports = router;
